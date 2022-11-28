const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

dotenv.config();

const PORT = process.env.PORT || 5555;

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("joinRoom", (roomCode) => {
    console.log(`User joined the room ${roomCode}`);
    socket.join(roomCode);
  });

  socket.on("play", ({ id, roomCode }) => {
    console.log(`Play at ${id} to ${roomCode}`);
    socket.broadcast.to(roomCode).emit("updateGame", id);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to tic-tac-toe app!");
});

server.listen(PORT, () => console.log(`server starts on ${PORT}`));
