const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")
const messageContainer = document.getElementById("message-container")

const socket = io("http://localhost:3000", {
  withCredentials: true
})

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