const socket = io();

const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const typingStatus = document.getElementById('typing-status');

messageInput.addEventListener('input', () => {
    socket.emit('typing');
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit('message', message);
            messageInput.value = '';
        }
    }
});

socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});

socket.on('typing', () => {
    typingStatus.textContent = '相手が入力中...';
});

socket.on('stopTyping', () => {
    typingStatus.textContent = '';
});
