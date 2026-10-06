# 💬 Chat Application — Backend

A scalable **real-time chat application backend** built with **Node.js, Express.js, MongoDB, Mongoose, JWT, and Socket.IO**.

This backend provides secure authentication, user management, conversations, persistent messaging, real-time communication, typing indicators, online/offline presence, and message read status. It is designed to integrate seamlessly with a React frontend.

## 🛠️ Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![REST API](https://img.shields.io/badge/REST-API-02569B?style=for-the-badge)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-003A70?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

## 📌 Overview

The **Chat Application Backend** is a RESTful and real-time API designed for a modern messaging platform.

It combines traditional REST APIs with **Socket.IO WebSockets** to provide instant communication between users.

### Core capabilities

- 🔐 Secure user authentication
- 👤 User profiles and search
- 💬 Direct conversations
- 📩 Real-time messaging
- ⚡ Socket.IO communication
- 🟢 Online/offline presence
- ⌨️ Typing indicators
- ✓ Message read status
- 🕐 Last-seen tracking
- 📚 Paginated message history
- 🔒 Password hashing
- 🛡️ Security middleware
- 🚦 API rate limiting
- 📦 MongoDB persistence

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Password hashing using bcrypt
- Current authenticated user endpoint
- Token expiration

### 👤 User Management

- Search users by name or email
- Update user profile
- Avatar support
- User bio
- Online/offline status
- Last-seen timestamp

### 💬 Conversations

- Create direct conversations
- Retrieve user's conversations
- Retrieve individual conversations
- Prevent duplicate direct conversations
- Store conversation participants
- Track the latest message

### 📩 Messaging

- Send messages using REST API
- Send messages in real time using Socket.IO
- Retrieve message history
- Pagination support
- Message timestamps
- Sender information
- Mark messages as read

### ⚡ Real-Time Features

Socket.IO provides:

- Real-time message delivery
- Typing indicators
- Online/offline status
- Last-seen updates
- Message read events
- Conversation rooms

---

## 🏗️ Project Structure

```text
Chat_Application_Backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── conversation.controller.js
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/
│   │   ├── Conversation.js
│   │   ├── Message.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── conversation.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   │
│   ├── socket/
│   │   └── index.js
│   │
│   └── utils/
│       └── token.js
│
├── postman/
│   └── Chat-Application-API.postman_collection.json
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

## 🔄 Application Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │      / Client       │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                REST API              Socket.IO
                    │                     │
                    ▼                     ▼
            ┌─────────────────────────────────┐
            │          Express Server         │
            │                                 │
            │  Authentication                 │
            │  Users                          │
            │  Conversations                  │
            │  Messages                       │
            └───────────────┬─────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    MongoDB     │
                    │                │
                    │ Users          │
                    │ Conversations  │
                    │ Messages       │
                    └───────────────┘
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- **Node.js 18+**
- **npm**
- **MongoDB** or MongoDB Atlas
- **Postman** — optional, for API testing

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/Chat_Application_Backend.git
```

Navigate into the project:

```bash
cd Chat_Application_Backend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/chat_application

JWT_SECRET=your_super_secret_jwt_key

CLIENT_URL=http://localhost:5173
```

### Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |
| `CLIENT_URL` | React frontend URL |

> ⚠️ Never commit your `.env` file to GitHub.

---

# ▶️ Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The backend will start at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

# 🔑 Authentication API

## Register

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "Ajinkya",
  "email": "ajinkya@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "ajinkya@example.com",
  "password": "password123"
}
```

The response provides a JWT token.

Use it for protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Get Current User

```http
GET /api/auth/me
```

Requires authentication.

---

# 👥 User API

## Get Users

```http
GET /api/users
```

Search users:

```http
GET /api/users?search=john
```

---

## Update Profile

```http
PATCH /api/users/profile
```

Example:

```json
{
  "name": "Ajinkya Developer",
  "bio": "Full-Stack MERN Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

# 💬 Conversation API

## Get Conversations

```http
GET /api/conversations
```

---

## Create Conversation

```http
POST /api/conversations
```

Request:

```json
{
  "participantId": "USER_MONGODB_ID",
  "type": "direct"
}
```

---

## Get Conversation

```http
GET /api/conversations/:id
```

---

# 📩 Message API

## Get Messages

```http
GET /api/messages/:conversationId
```

Pagination:

```http
GET /api/messages/:conversationId?page=1&limit=30
```

---

## Send Message

```http
POST /api/messages/:conversationId
```

Request:

```json
{
  "text": "Hello! How are you?"
}
```

---

## Mark Conversation as Read

```http
PATCH /api/messages/:conversationId/read
```

---

# ⚡ Socket.IO

The application uses **Socket.IO** for real-time communication.

Connect from the React frontend:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token: YOUR_JWT_TOKEN
  }
});
```

---

## 📨 Send Real-Time Message

```javascript
socket.emit("message:send", {
  conversationId,
  text: "Hello!"
});
```

Listen for messages:

```javascript
socket.on("message:new", (message) => {
  console.log(message);
});
```

---

## ⌨️ Typing Indicator

Start typing:

```javascript
socket.emit("typing:start", {
  conversationId
});
```

Stop typing:

```javascript
socket.emit("typing:stop", {
  conversationId
});
```

Listen for typing events:

```javascript
socket.on("typing:start", (data) => {
  console.log(`${data.userId} is typing...`);
});

socket.on("typing:stop", (data) => {
  console.log("User stopped typing");
});
```

---

## 🟢 Online Status

Listen for user status changes:

```javascript
socket.on("user:status", (data) => {
  console.log(data);
});
```

Example:

```json
{
  "userId": "64f...",
  "isOnline": true,
  "lastSeen": "2026-10-06T12:30:00.000Z"
}
```

---

## ✓ Message Read Status

Mark messages as read:

```javascript
socket.emit("message:read", {
  conversationId
});
```

Listen for read events:

```javascript
socket.on("message:read", (data) => {
  console.log(data);
});
```

---

# 🧪 API Testing

A ready-to-use **Postman collection** is included:

```text
postman/
└── Chat-Application-API.postman_collection.json
```

Import this collection into Postman and configure:

```text
baseUrl
token
conversationId
participantId
```

You can test the complete authentication, user, conversation, and messaging API.

---

# 🔒 Security

The backend includes several security measures:

- JWT authentication
- bcrypt password hashing
- Helmet security headers
- CORS configuration
- API rate limiting
- Protected routes
- Environment-based secrets
- Centralized error handling
- Input length restrictions

---

# 📊 Database Models

## User

```text
User
├── name
├── email
├── password
├── avatar
├── bio
├── isOnline
├── lastSeen
├── createdAt
└── updatedAt
```

## Conversation

```text
Conversation
├── participants
├── type
├── name
├── avatar
├── lastMessage
├── createdBy
├── createdAt
└── updatedAt
```

## Message

```text
Message
├── conversation
├── sender
├── text
├── type
├── readBy
├── createdAt
└── updatedAt
```

---

# 🚀 Future Improvements

The project can be extended with:

- 👥 Group conversations
- 📎 File and image messages
- 🎤 Voice messages
- 📹 Video calling
- 🔔 Push notifications
- 🔄 Refresh tokens
- 🔍 Advanced message search
- 🗑️ Delete/edit messages
- 😀 Emoji reactions
- 📌 Message pinning
- 👁️ Message delivery status
- 🟢 Redis-based Socket.IO scaling
- ☁️ Cloudinary/S3 media storage
- 🧪 Automated unit and integration tests
- 🐳 Docker deployment
- 🔄 CI/CD pipeline

---

# 🌐 Frontend Integration

This backend can be connected to a React frontend using:

```text
React
   │
   ├── Axios / Fetch
   │       │
   │       └── REST API
   │
   └── Socket.IO Client
           │
           └── Real-Time Communication
                    │
                    ▼
              Express + Socket.IO
                    │
                    ▼
                 MongoDB
```

---

# 📁 Recommended MERN Project Structure

For a complete MERN application:

```text
Chat-Application/
│
├── frontend/
│   └── React Application
│
└── backend/
    └── Node + Express Application
```

---

# 📌 Project Highlights

| Feature | Technology |
|---|---|
| Backend | Node.js |
| API | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcrypt |
| Real-Time Communication | Socket.IO |
| API Testing | Postman |
| Security Headers | Helmet |
| Rate Limiting | Express Rate Limit |

---

# 👨‍💻 Author

**Ajinkya Dhatrak**

Github : ```https://github.com/ajinkya029```

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.