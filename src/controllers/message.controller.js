const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 30, 1), 100);
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    const [messages, total] = await Promise.all([
      Message.find({ conversation: conversationId })
        .populate("sender", "name avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments({ conversation: conversationId })
    ]);

    res.json({
      success: true,
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required."
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user._id,
      text: text.trim()
    });

    conversation.lastMessage = message._id;
    await conversation.save();

    const populated = await Message.findById(message._id).populate(
      "sender",
      "name avatar"
    );

    res.status(201).json({
      success: true,
      message: populated
    });
  } catch (error) {
    next(error);
  }
};

const markConversationRead = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    await Message.updateMany(
      {
        conversation: conversation._id,
        readBy: { $ne: req.user._id }
      },
      { $addToSet: { readBy: req.user._id } }
    );

    res.json({
      success: true,
      message: "Conversation marked as read."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  createMessage,
  markConversationRead
};
