const initSocketUser = require("./socketUser")

function initServerSocket(server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true
    }
  }); // inti
  
  initSocketUser(io)
  
  io.on('connection', (socket) => {
    console.log("client connected: ", socket.id)
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

    socket.on("ping", n => console.log(n))
  });
  
  // deklarasi socket admin dashboard
  const { instrument } = require("@socket.io/admin-ui")
  // inisialisasi
  instrument(io, { auth: false })
}

module.exports = initServerSocket;