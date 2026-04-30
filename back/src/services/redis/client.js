import { createClient } from 'redis';

import dotenv from 'dotenv';
dotenv.config();


const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

async function setupRedis() {
  const client = createClient({
    url: `${redisUrl}`,
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (err) => {
    console.error('Redis error:', err);
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    throw err;
  }
}

export const redisClient = await setupRedis();