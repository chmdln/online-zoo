import { createMessage } from './messageItem.js';

export class ChatUI {
  constructor(containerId) {
    this.containerId = containerId;
    this.MAX_MESSAGES = 50; 
  }

  get container() {
    return document.getElementById(this.containerId);
  }

  updateViewCount(count) {
    const el = document.querySelector('.chat-count');
    if (el) {
      el.textContent = `${count} watching`;
    }
  }

  addMessage(messageData) {
    const msgText = messageData.text || '';
    const msgFile = messageData.file || '';
    if (!msgText && !msgFile) return;
    
    const msgEl = createMessage(messageData);
    this._appendAndTrim(msgEl);
  }

  _appendAndTrim(msgEl) {
    const emptyEl = this.container.querySelector('.chat-empty');
    if (emptyEl) emptyEl.remove();
    this.container.appendChild(msgEl);
    this.scrollToBottom();

    // leave last 50 messages 
    const messages = this.container.querySelectorAll('.chat-message, .donation-message');
    if (messages.length > this.MAX_MESSAGES) {
      const excess = messages.length - this.MAX_MESSAGES;
      for (let i = 0; i < excess; i++) {
        messages[i].remove();
      }
    }
    this.scrollToBottom();
  }

  renderChatHistory(messages) {
    this.container.innerHTML = '';
    messages.forEach(msg => this.addMessage(msg));
  }

  renderDonationNotification(data) {
    const { name, amount, petId, petName } = data;
    const messages = [
      `🎉 ${name} just supported the zoo! 🐾💚`,
      `🐾 ${name} just donated  $${amount} to ${petName}! Big Thank You!`,
      `🐼 ${name} just fed the animals! You're amazing!`,
      `💚 ${name} just made a difference for our furry friends!`,
      `🔥 ${name} just made a donation for ${petName}! Big Thank You!`,
      `🦁 Big thanks to ${name} for $${amount} donation to ${petName}!`,
    ];
    const donationMessage = messages[Math.floor(Math.random() * messages.length)];

    const msgEl = document.createElement('div');
    const emptyEl = this.container.querySelector('.chat-empty');
    if (emptyEl) emptyEl.remove();
    
    msgEl.className = 'donation-message';
    msgEl.innerHTML = donationMessage;
    this.container.appendChild(msgEl);
    this.scrollToBottom();

    setTimeout(() => {
      const rect = msgEl.getBoundingClientRect();

      confetti({
        particleCount: 90,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: rect.top / window.innerHeight,
        }
      });
    }, 100);
  }

  addFilePreview(file, selectedFiles, previewBar, input) {
    selectedFiles.push(file);
    const index = selectedFiles.length - 1;

    const item = document.createElement('div');
    item.className = 'file-preview-item';
    item.dataset.index = index;

    // preview content
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      item.appendChild(img);
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.muted = true;
      item.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.className = 'file-preview-icon';
      img.src = this._getFileIcon(file.type);
      item.appendChild(img);
    }

    // file name
    const nameContainer = document.createElement('div');
    nameContainer.className = 'file-preview-name-container';
    item.appendChild(nameContainer);
    const name = document.createElement('div');
    name.className = 'file-preview-name';
    name.textContent = file.name;
    nameContainer.appendChild(name);

    // remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'file-preview-remove';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => {
      selectedFiles[index] = null; 
      item.remove();
      if (selectedFiles.every(f => f === null)) {
        previewBar.classList.remove('active');
        input.placeholder = 'Chat about your fave pets...';
      }
    });
    item.appendChild(removeBtn);

    previewBar.appendChild(item);
    previewBar.classList.add('active');

    // update input placeholder
    const count = selectedFiles.filter(Boolean).length;
    input.placeholder = `${count} file${count > 1 ? 's' : ''} selected`;
  }

  _getFileIcon(mimeType) {
    if (mimeType.includes('pdf')) {
      return '../../assets/icons/chat/pdf-file-type.svg';
    };
    if (mimeType.includes('word') || mimeType.includes('document')) {
      return '../../assets/icons/chat/word-file-type.svg';
    }
    if (mimeType.includes('zip') || mimeType.includes('archive')) {
      return '../../assets/icons/chat/zip-file-type.svg'; 
    }
    if (mimeType.includes('audio')) {
      return '../../assets/icons/chat/audio-file-type.svg'; 
    }
    if (mimeType.includes('video')) {
      return '../../assets/icons/chat/video-file-type.svg'; 
    }
    return '../../assets/icons/chat/txt-file-type.svg'
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }
}