const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
        : "*",
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.user._id.toString();

    await User.findByIdAndUpdate(userId, {
      isOnline: true,
      lastSeen: new Date()
    });

    socket.join(`user:${userId}`);

    const conversations = await Conversation.find({
      participants: socket.user._id
    }).select("_id");

    conversations.forEach((conversation) => {
      socket.join(`conversation:${conversation._id}`);
    });

    io.emit("user:status", {
      userId,
      isOnline: true,
      lastSeen: new Date()
    });

    socket.on("conversation:join", async (conversationId, callback) => {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: socket.user._id
      });

      if (!conversation) {
        return callback?.({
          success: false,
          message: "Conversation not found."
        });
      }

      socket.join(`conversation:${conversationId}`);
      callback?.({ success: true });
    });

    socket.on("message:send", async ({ conversationId, text }, callback) => {
      try {
        if (!text?.trim()) {
          return callback?.({
            success: false,
            message: "Message text is required."
          });
        }

        const conversation = await Conversation.findOne({
          _id: conversationId,
          participants: socket.user._id
        });

        if (!conversation) {
          return callback?.({
            success: false,
            message: "Conversation not found."
          });
        }

        const message = await Message.create({
          conversation: conversationId,
          sender: socket.user._id,
          text: text.trim()
        });

        conversation.lastMessage = message._id;
        await conversation.save();

        const populatedMessage = await Message.findById(message._id).populate(
          "sender",
          "name avatar"
        );

        io.to(`conversation:${conversationId}`).emit(
          "message:new",
          populatedMessage
        );

        callback?.({
          success: true,
          message: populatedMessage
        });
      } catch (error) {
        callback?.({
          success: false,
          message: "Unable to send message."
        });
      }
    });

    socket.on("typing:start", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:start", {
        conversationId,
        userId
      });
    });

    socket.on("typing:stop", ({ conversationId }) => {
      socket.to(`conversation:${conversationId}`).emit("typing:stop", {
        conversationId,
        userId
      });
    });

    socket.on("message:read", async ({ conversationId }) => {
      const conversation = await Conversation.findOne({
        _id: conversationId,
        participants: socket.user._id
      });

      if (!conversation) return;

      await Message.updateMany(
        {
          conversation: conversationId,
          readBy: { $ne: socket.user._id }
        },
        { $addToSet: { readBy: socket.user._id } }
      );

      io.to(`conversation:${conversationId}`).emit("message:read", {
        conversationId,
        userId
      });
    });

    socket.on("disconnect", async () => {
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date()
      });

      io.emit("user:status", {
        userId,
        isOnline: false,
        lastSeen: new Date()
      });
    });
  });

  return io;
};

module.exports = { initializeSocket };
