import http from 'http';
import app from './app.js';
import multer from 'multer';
import { s3, AWS_BUCKET, AWS_REGION } from './services/s3/client.js'; 
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { userRepository } from './db/user.repository.js';
import { setupSocketIoClient } from './services/socket/socket.js';
import { prisma } from './db/client.js';

import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});

export const io = setupSocketIoClient(server);


const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
});


app.get("/health/db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: 'connected' });
  } catch (error) {
    res.status(500).json({ db: 'failed', error });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    // unique filename
    const safeName = file.originalname.replace(/\s+/g, "-");
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 10)}-${safeName}`;

    // upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: AWS_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // public URL
    const url = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;

    return res.json({
      url,
      fileName,
      type: file.mimetype,
    });
  } catch (err) {
    console.error("Upload error:", err);

    return res.status(500).json({
      error: "File upload failed",
    });
  }
});

app.post("/user/signup", async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const user = await userRepository.createUser({ 
      name, username, email 
    });
    return res.json(user);
  } catch (err) {
    console.error("User creation error:", err);
    return res.status(500).json({
      error: "User creation failed",
    });
  }
});

app.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userRepository.findByLogin(username);
    return res.json(user);
  } catch (err) {
    console.error("User signin error:", err);
    return res.status(500).json({
      error: "User signin failed",
    });
  }
})

app.put("/user/donate/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userRepository.updateUser(username, { isDonor: true });
    return res.json(user);
  } catch (err) {
    console.error("User update error:", err);
    return res.status(500).json({
      error: "User update failed",
    });
  }
});

