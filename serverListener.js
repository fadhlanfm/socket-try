const express = require('express')
const app = express()
const { io } = require("socket.io-client");
 
const socket = io("http://localhost:3000", {
  withCredentials: true
});

socket.on(`receive-message`, message => console.log(message))
 
app.listen(3001, () => {
  console.log("server 3001 running")
})