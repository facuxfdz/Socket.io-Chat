
// Setting up express
const express = require('express');
const app = express();
const path = require('path');


// Setting port up
app.set('port', process.env.PORT || 3000);


// Static files (sending public dir to the browser)
app.use(express.static(path.join(__dirname, 'public')));


// Starting server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})

// WebSockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('chat:typing', username);
    })
});


