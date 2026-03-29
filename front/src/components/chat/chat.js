import { socket } from '../../socket.js';
import { ChatUI } from './chatUI.js';


export class Chat {
  constructor(containerId) {
    this.ui = new ChatUI(containerId);
    this.socket = socket;
    this.currentRoom = '1';
    this.registerSocketEvents();
  }

  registerSocketEvents() {

    this.socket.on('chat_history', (messages, roomId) => {
      if (roomId !== this.currentRoom) return;

      if (messages.length === 0) {
        this.ui.container.innerHTML = `
          <div class="chat-empty">
            No messages yet. Be the first to chat 
          </div>
        `;
      } else {
       this.ui.renderChatHistory(messages);
      }
    });

    this.socket.on('receive_message', (messageData) => {
      if (messageData.roomId !== this.currentRoom) return;
      this.ui.addMessage(messageData);
    });

    this.socket.on('viewer_count_update', (data) => {
      const { count, roomId } = data;
      if (roomId !== this.currentRoom) return;
      this.ui.updateViewCount(count);
    });

    this.socket.on('donation_receive', (data) => {
      this.ui.renderDonationNotification(data);
    })
  }

  initRoom(roomId) {
    if (this.currentRoom) {
      this.socket.emit('leave_room', this.currentRoom);
    }

    if (roomId) {
      this.currentRoom = roomId;
      this.socket.emit('join_room', roomId);
    }
  }

  sendMessage(messageData) {
    if (!this.currentRoom) return;
    this.socket.emit('send_message', {
      roomId: this.currentRoom,
      messageData
    });
  }

  switchRoom(newRoomId, name) {
    this.initRoom(newRoomId);
  }
}