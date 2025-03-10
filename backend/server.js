const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// เก็บข้อมูลห้องและผู้ใช้
const rooms = {};

app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/chat.html");
});

// ตั้งค่าการเชื่อมต่อ Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected");

  // ส่งรายชื่อห้องที่มีอยู่ไปยังผู้ใช้ใหม่
  socket.emit("updateRoomList", Object.keys(rooms));

  // รับข้อมูลผู้ใช้และห้องที่ต้องการเข้าร่วม
  socket.on("joinRoom", (data) => {
    const { user, room } = data;

    // ตรวจสอบว่าห้องมีอยู่แล้วหรือไม่
    if (!rooms[room]) {
      rooms[room] = []; // สร้างห้องใหม่หากไม่มี
    }

    // ให้ผู้ใช้เข้าร่วมห้อง
    socket.join(room);
    rooms[room].push({ id: socket.id, user });
    console.log(`${user} joined ${room}`);

    // ส่งข้อความต้อนรับไปยังผู้ใช้
    socket.emit("message", `Welcome, ${user}! You are in ${room}`);

    // แจ้งเตือนผู้ใช้คนอื่นในห้องว่ามีผู้ใช้ใหม่เข้าร่วม
    socket.to(room).emit("message", `${user} has joined the room`);

    // อัปเดตรายชื่อผู้ใช้ในห้อง
    io.to(room).emit(
      "updateUserList",
      rooms[room].map((u) => u.user)
    );
  });

  // รับข้อความจากผู้ใช้และส่งไปยังห้องที่ผู้ใช้อยู่
  socket.on("clientMessage", (data) => {
    const { user, room, message } = data;
    console.log(`Message from ${user} in ${room}: ${message}`);

    // ส่งข้อความไปยังห้องที่ผู้ใช้อยู่
    io.to(room).emit("message", `${user}: ${message}`);
  });

  // เมื่อผู้ใช้ตัดการเชื่อมต่อ
  socket.on("disconnect", () => {
    console.log("User disconnected");

    // ลบผู้ใช้ออกจากห้อง
    for (const room in rooms) {
      const userIndex = rooms[room].findIndex((u) => u.id === socket.id);
      if (userIndex !== -1) {
        const [user] = rooms[room].splice(userIndex, 1);
        io.to(room).emit("message", `${user.user} has left the room`);

        // อัปเดตรายชื่อผู้ใช้ในห้อง
        io.to(room).emit(
          "updateUserList",
          rooms[room].map((u) => u.user)
        );

        // ลบห้องหากไม่มีผู้ใช้
        if (rooms[room].length === 0) {
          delete rooms[room];
          io.emit("updateRoomList", Object.keys(rooms));
        }
        break;
      }
    }
  });
});

// ตั้งค่าให้ server ทำงานที่พอร์ต 3111
server.listen(3111, () => {
  console.log("Server running on port 3111");
});
