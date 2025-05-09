# Chat Example Express

โปรเจกต์นี้เป็นแอปพลิเคชันแชทที่พัฒนาด้วย Express.js และ Socket.IO สำหรับการสื่อสารแบบเรียลไทม์

This project is a real-time chat application built with Express.js and Socket.IO for real-time communication.

## 🚀 ฟีเจอร์หลัก / Key Features

- การส่งข้อความแบบเรียลไทม์ระหว่างผู้ใช้ / Real-time messaging between users
- การเชื่อมต่อผ่าน Socket.IO / Socket.IO connection
- ไม่มีการใช้ฐานข้อมูล (ข้อมูลจะหายไปเมื่อรีสตาร์ทเซิร์ฟเวอร์) / No database (data is lost on server restart)

## 🧰 เทคโนโลยีที่ใช้ / Tech Stack

- Node.js
- Express.js
- Socket.IO
- HTML / CSS / JavaScript


``` 
chat-example-express/
├── backend/
│   ├── server.js          # ไฟล์หลักของเซิร์ฟเวอร์ / Main server file
│   └── ...
├── public/
│   ├── index.html         # หน้า HTML หลัก / Main HTML page
│   ├── style.css          # สไตล์ CSS / CSS styles
│   └── script.js          # สคริปต์ JavaScript / JavaScript scripts
└── package.json           # ข้อมูลโปรเจกต์และ dependencies / Project metadata and dependencies
```
