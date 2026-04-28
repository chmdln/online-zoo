import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { userRepository } from './db/user.repository.js';
import { redisClient } from './redis/client.js';
import dotenv from 'dotenv';
dotenv.config();


const SERVER_PORT = process.env.SERVER_PORT || 3000;
const AWS_BUCKET = process.env.AWS_BUCKET; 
const AWS_REGION = process.env.AWS_REGION || 'eu-north-1'; 
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// server setup
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
server.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});

// redis setup
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:5173', 
             'http://localhost:5173', 
             'http://127.0.0.1:5500', 
             'http://localhost:5500', 
             '*'], 
  },
});


// S3 client setup
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB limit
  },
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


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_view', (roomId) => {
    const viewRoom = `view:${roomId}`;
    socket.join(viewRoom);
    // store for disconnect cleanup
    socket.data.viewRoom = viewRoom;
    socket.data.roomId = roomId;
    const count = io.sockets.adapter.rooms.get(viewRoom)?.size || 0;
    io.to(viewRoom).emit('viewer_count_update', { count, roomId });
  });

  socket.on('leave_view', (roomId) => {
    const viewRoom = `view:${roomId}`;
    socket.leave(viewRoom);
    const count = io.sockets.adapter.rooms.get(viewRoom)?.size || 0;
    io.to(viewRoom).emit('viewer_count_update', { count, roomId });
  });


  socket.on('join_room', async (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // fetch last 50 messages
    const messages = await redisClient.lRange(`room:${roomId}`, 0, 49);
    const parsed = messages
      .map(m => JSON.parse(m))
      .reverse(); // LPUSH stores newest first
    socket.emit("chat_history", parsed, roomId);
  });
    

  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('send_message', async (data) => {
    const { roomId, messageData } = data;
    io.to(roomId).emit('receive_message', {
        ...messageData,
        roomId
    });
    // save to redis
    await redisClient.lPush(`room:${roomId}`, JSON.stringify(messageData));
    await redisClient.lTrim(`room:${roomId}`, 0, 49); 
  });

  socket.on('donation_submit', (data) => {
    io.emit('donation_receive', data);
  });

  socket.on('disconnect', () => {
    const viewRoom = socket.data.viewRoom;
    const roomId = socket.data.roomId;

    if (!viewRoom || !roomId) return;
      // wait a tick so socket is removed from room
      setImmediate(() => {
        const count = io.sockets.adapter.rooms.get(viewRoom)?.size || 0;
        io.to(viewRoom).emit('viewer_count_update', {
          count,
          roomId,
        });
      });
      console.log('User disconnected:', socket.id);
    });
});