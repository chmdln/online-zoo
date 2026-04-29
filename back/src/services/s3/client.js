import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import dotenv from 'dotenv';
dotenv.config();

const AWS_BUCKET = process.env.AWS_BUCKET; 
const AWS_REGION = process.env.AWS_REGION || 'eu-north-1'; 
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export { s3, AWS_BUCKET, AWS_REGION };

