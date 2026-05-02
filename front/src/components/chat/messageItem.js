import { User } from './user.js';

export function createMessage(message) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-message';
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = message.avatarName;
  avatar.style.backgroundColor = message.avatarColor;

  const content = document.createElement('div');
  content.className = 'message-content';
  const username = document.createElement('span');
  username.className = 'username';
  username.textContent = message.username;

  // const userStr = localStorage.getItem('user');
  if ((User.isDonor && message.username === User.username) || message.isDonor) {
    const usernameContainer = document.createElement('div');
    usernameContainer.className = 'username-container';
    usernameContainer.appendChild(username);
    username.style.color = 'white';
    const badge = document.createElement('img');
    badge.className = 'donor-badge';
    badge.src = '/assets/icons/chat/1-panda-crown.svg';
    usernameContainer.appendChild(badge);
    content.appendChild(usernameContainer);
  } else {
    content.appendChild(username);  
  } 

  // text
  if (message.text) {
    const textEl = document.createElement('span');
    textEl.className = 'text';
    textEl.style.wordBreak = 'break-all';

    if (isValidUrl(message.text)) {
      const link = document.createElement('a');
      link.href = message.text;
      link.textContent = message.text;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      textEl.appendChild(link);
    } else {
      textEl.textContent = message.text;
    }
    content.appendChild(textEl);

    // YouTube embed
    const videoId = extractYouTubeId(message.text);
    if (videoId) {
      wrapper.style.alignItems = 'flex-start';
      content.style.alignItems = 'flex-start'; 
      content.style.flexDirection = 'column';
      renderYouTubePreview(videoId, content);

    }
  }

  // file handling logic
  if (message.file?.url) {
    const { url, type, fileName } = message.file;

    // img
    if (type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = fileName || 'image';
      img.className = 'chat-media image';
      img.style.maxWidth = '100%';
      img.style.borderRadius = '10px';
      img.style.marginTop = '6px';
      img.addEventListener('load', scrollToBottom)
      content.appendChild(img);
    }

    // video
    else if (type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = url;
      video.controls = true;
      video.className = 'chat-media video';
      video.style.maxWidth = '100%';
      video.style.borderRadius = '10px';
      video.style.marginTop = '6px';
      video.addEventListener('loadedmetadata', scrollToBottom)
      content.appendChild(video);
    }

    // other file types
    else {
      const fileLink = document.createElement('a');
      fileLink.href = url;
      fileLink.target = '_blank';
      fileLink.className = 'chat-file';
      fileLink.textContent = `${fileName || 'Download file'}`;
      content.appendChild(fileLink);
    }
  }

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  return wrapper;
}

function scrollToBottom() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight; 
}


function extractYouTubeId(text) {
  const match = text.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] || null;
}

function renderYouTubePreview(videoId, container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'yt-preview';

  const thumbnailWrap = document.createElement('div');
  thumbnailWrap.className = 'yt-thumbnail-wrap';

  const img = document.createElement('img');
  img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  img.alt = 'Video thumbnail';
  img.className = 'yt-thumbnail';
  img.addEventListener('load', scrollToBottom);

  const playBtn = document.createElement('div');
  playBtn.className = 'yt-play-btn';
  playBtn.innerHTML = `
    <svg viewBox="0 0 68 48" width="48" height="34">
      <path class="yt-play-bg" d="M66.5 7.7a8.5 8.5 0 0 0-6-6C56 0 34 0 34 0S12 0 7.5 1.7a8.5 8.5 0 0 0-6 6C0 12.1 0 24 0 24s0 11.9 1.5 16.3a8.5 8.5 0 0 0 6 6C12 48 34 48 34 48s22 0 26.5-1.7a8.5 8.5 0 0 0 6-6C68 35.9 68 24 68 24s0-11.9-1.5-16.3z"/>
      <path class="yt-play-arrow" d="M45 24 27 14v20z"/>
    </svg>
  `;

  thumbnailWrap.appendChild(img);
  thumbnailWrap.appendChild(playBtn);

  thumbnailWrap.addEventListener('click', () => {
    wrapper.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        class="yt-iframe"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
  });

  wrapper.appendChild(thumbnailWrap);
  container.appendChild(wrapper);
}

function isValidUrl(text) {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}
