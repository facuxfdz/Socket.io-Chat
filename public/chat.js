const socket = io(); // Socket which keep the connection

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// Sending
btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

// Listening
socket.on('chat:message', (data) => {
    message.value = '';
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', (username) => {
    actions.innerHTML = `<p><em>${username} is typing a message...</em></p>` 
})