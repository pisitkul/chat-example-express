const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { Socket } = require("./socket/socket");

app.use(express.static(__dirname + "/views"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/chat.html");
});

// socket connection
io.on("connection", (socket) => {
  Socket(io, socket);
});

// ตั้งค่าให้ server ทำงานที่พอร์ต 3111
server.listen(process.env.PORT || 3111, () => {
  console.log("Server running on port", process.env.PORT || 3111);
});
