// setup connection socket
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: true,
    credentials: true
  }
}); // inti

io.on('connection', (socket) => { 
  socket.on("custom-event", (payload) => {
    console.log("payload: ", payload)
  })

  socket.on("send-message", (message, room) => {
    console.log("message", message, room)
    if (room === "") {
      socket.broadcast.emit(`receive-message`, message)
    } else {
      socket.to(room).emit(`receive-message`, message)
    }
  })

  socket.on("join-room", (room) => {
    socket.join(room)
  })
});

server.listen(3000, () => {
  console.log("server is running")
})