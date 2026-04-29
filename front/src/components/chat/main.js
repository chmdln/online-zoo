import { Chat } from './chat.js';
import { User } from './user.js';
import { socket } from '../../socket.js';
import { Picker } from 'emoji-mart'; 


// get DOM elements
const closeMenu = document.querySelector('.chat-close-container');
const chatRoot = document.getElementById('chat-root');
const chatEl = document.querySelector('.chat');
const input = document.querySelector('.chat-text-input');
const sendBtn = document.querySelector('.chat-send');
const emojiBtn = document.querySelector('.emoji-btn');
const emojiPickerContainer = document.getElementById('emoji-picker');
const fileInput = document.getElementById('file-input');
const previewBar = document.getElementById('file-preview-bar');
const main = document.querySelector('main');

// chat is initially locked
let currentRoom = '1';
// let hasJoined = false;
const chat = new Chat('chat-messages');
chat.initRoom(currentRoom);


export function switchChatRoom(petId, petName) {
    currentRoom = petId;
    const iconEl = document.querySelector('.chat-icon img');
    if (iconEl) {
        iconEl.src = `../../assets/icons/chat/${petId}-chat.svg`;
    }
    const titleEl = document.querySelector('.chat-title');
    if (titleEl) {
        titleEl.innerHTML = `Live ${petName.toUpperCase()} chat`;
    }
    const chatEl = document.querySelector('.chat'); 
    chatEl.style.background = `
      url(../../assets/icons/chat/${petId}-bg-chat.svg) 
      center / cover 
      no-repeat
    `;
    if (!chat) return; 
    chat.switchRoom(petId);
}

// build message object
function createMessageObject({ text = '', file = null }) {
  const username = User.username;
  const avatarName = User.avatarName;
  const avatarColor = User.avatarColor;
  const isDonor = User.isDonor;

  return {
    username,
    avatarName,
    avatarColor,
    isDonor,
    text,
    file, 
  };
}


let selectedFiles = [];
fileInput.setAttribute('multiple', true);
fileInput.addEventListener("change", (e) => {
  const newFiles = Array.from(e.target.files);
  newFiles.forEach((file) => {
    chat.ui.addFilePreview(file, selectedFiles, previewBar, fileInput);
  })
  fileInput.value = ''; // same file can't be re-added
});


async function handleSend() {
  const text = input.value.trim();
  const activeFiles = selectedFiles.filter(Boolean); 
  if (!text && activeFiles.length === 0) return;

  const uploadedFiles = await Promise.all(
    activeFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return { 
        url: data.url, 
        fileName: data.fileName, 
        type: data.type 
      };
    })
  );
  
  // if text only
  if (uploadedFiles.length === 0) {
    chat.sendMessage(createMessageObject({ text, file: null }));
  }

  // send one message per file (with text only on the first)
  uploadedFiles.forEach((fileData, i) => {
    const message = createMessageObject({
      text: i === 0 ? text : '',
      file: fileData,
    });
    chat.sendMessage(message);
  });

  // cleanup
  input.value = "";
  input.placeholder = 'Chat about your fave pets...';
  input.style.color = '';
  fileInput.value = "";
  selectedFiles = [];
  previewBar.innerHTML = '';
  previewBar.classList.remove('active');

}

window.addEventListener('scroll', () => {
    const headerBottom = header.getBoundingClientRect().bottom;
    const footerTop = footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const footerHeight = footer.offsetHeight;

    // how much visible space exists above footer
    const availableHeight = Math.min(
        viewportHeight,
        footerTop
    );

    if (headerBottom <= 0) {
        chatRoot.style.top = '0px';
        chatRoot.style.height = `${availableHeight}px`;
    } else {
        chatRoot.style.top = `${headerBottom}px`;
        chatRoot.style.height = `${availableHeight - headerBottom}px`;
    }
});

closeMenu.addEventListener('click', () => {
  if (chatRoot.classList.contains('active')) {
    chatRoot.classList.remove('active');
    main.style.paddingRight = '0px';
  }
});

sendBtn.addEventListener('click', handleSend);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSend();
        emojiPickerContainer.classList.add('hidden');
    }
});

const picker = new Picker({
  onEmojiSelect: (emoji) => {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const before = input.value.slice(0, start);
    const after = input.value.slice(end);

    // add space only if needed
    const needsSpaceBefore =
      before.length > 0 && !before.endsWith(' ');

    const insertion = (needsSpaceBefore ? ' ' : '') + emoji.native;
    input.value = before + insertion + after;
    input.focus();

    const newCursorPos = start + insertion.length;
    input.selectionStart = input.selectionEnd = newCursorPos;
  },
});

emojiPickerContainer.appendChild(picker);
document.addEventListener('click', (e) => {
  if (
    !emojiPickerContainer.contains(e.target) &&
    !emojiBtn.contains(e.target)
  ) {
    emojiPickerContainer.classList.add('hidden');
  }
});

emojiBtn.addEventListener('click', () => {
  emojiPickerContainer.classList.toggle('hidden');
});