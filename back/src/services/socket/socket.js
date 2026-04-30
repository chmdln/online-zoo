import { Server } from 'socket.io';
import { setupSocketHandlers } from './handlers.js';

export function setupSocketIoClient(server) {
  const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  setupSocketHandlers(io);
  return io;
}


