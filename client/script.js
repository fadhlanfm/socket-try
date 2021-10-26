// const io = require('socket.io-client')

const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")
const messageContainer = document.getElementById("message-container")

const socket = io("http://localhost:3000", {
  withCredentials: true
})

const userSocket = io("http://localhost:3000/user", {
  withCredentials: true,
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppaGFkLmFrYmFyLmh1c3NhaW5pQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MzUyMjA3OTZ9.PHa8y2i-2e6RjQlpX6RsUvxGb-TURHvpnsnAGGkSBJg"
  }
})
console.log("userSocket", userSocket)
// throwed error masuk disini
userSocket.on("connect_error", error => {
  alert(error)
  // displayMessage(error)
})

// on("connect") lawannya on("connect_error")
socket.on("connect", () => {
  displayMessage(`You connected with id ${socket.id}`)
})

// const payload = {
//   int: 10, string: "hi",  a: "a" 
// }
// socket.emit("custom-event", payload)

socket.on("receive-message", message => displayMessage(message))


form.addEventListener("submit", e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value

  if (message === "") return
  socket.emit("send-message", message, room)
  displayMessage(message)

  messageInput.value = ""
})

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value
  socket.emit("join-room", room)
})

function displayMessage(message) {
  const div = document.createElement("div")
  div.textContent = message

  messageContainer.append(div)
}

let count = 0
setInterval(() => {
  // socket.emit("ping", ++count)
  socket.volatile.emit("ping", ++count)
}, 1000)

document.addEventListener("keydown", e => {
  if (e.target.matches("input")) return

  if (e.key === "c") socket.connect()
  if (e.key === "d") socket.disconnect()
})