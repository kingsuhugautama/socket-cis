const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, { 
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

server.listen(3000, () => {
  console.log('listening on *:3000'); 
});

app.get('/health', (req, res) => {
  res.send('Healthy');
});

io.on('connection', function (socket) {
  socket.on('test', function (msg, res) {
    console.log(msg);
    res(msg);
    io.sockets.emit('test-callback', msg);
  });
});
