import { Server } from 'socket.io';
import { setupSocketHandlers } from './handlers.js';

export function setupSocketIoClient(server) {
  const io = new Server(server, {
    cors: {
      origin: ['http://127.0.0.1:5173', 
               'http://localhost:5173', 
               '*'], 
    },
  });

  setupSocketHandlers(io);
  return io;
}


