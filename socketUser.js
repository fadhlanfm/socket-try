const jwt = require('jsonwebtoken');

function initSocketUser(io) {
  // custom namespaces
  const userIo = io.of("/user")
  userIo.on("connection", socket => {
    console.log(`client connected to /user. id: ${socket.id}. email: ${socket.email}`)
  
    // socket.on(`send-message-${socket.email}`)
  })
  
  userIo.use((socket, next) => {
    if (socket.handshake.auth.token) {
      // authorization success
      let token = socket.handshake.auth.token
      let userData = jwt.verify(token, 'rahasia1112');
      socket.email = userData.email
      next()
      // let user = await getUserByEmail(userData.email)
      // if (user) {
      //   next()
      // } else {
      //   error("email invalid")
      // }
    } else {
      // authorization failed
      // socket.broadcast.emit(`receive_error`, "Please send token")
      next(new Error("Please send token"))
    }
  })
}

module.exports = initSocketUser