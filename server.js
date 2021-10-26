// setup connection socket
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const initServerSocket = require("./socket")
initServerSocket(server)

server.listen(3000, () => {
  console.log("server is running localhost:3000")
})