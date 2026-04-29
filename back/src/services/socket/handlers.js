import { redisClient } from '../redis/client.js';

export function setupSocketHandlers(io) {
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
}
