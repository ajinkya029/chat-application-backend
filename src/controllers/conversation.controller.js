const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const createConversation = async (req, res, next) => {
  try {
    const { participantId, type = "direct", name } = req.body;

    if (!participantId) {
      return res.status(400).json({
        success: false,
        message: "participantId is required."
      });
    }

    if (participantId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot create a conversation with yourself."
      });
    }

    const participant = await User.findById(participantId);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found."
      });
    }

    if (type === "direct") {
      const existing = await Conversation.findOne({
        type: "direct",
        participants: { $all: [req.user._id, participantId], $size: 2 }
      })
        .populate("participants", "name email avatar bio isOnline lastSeen")
        .populate({
          path: "lastMessage",
          populate: { path: "sender", select: "name avatar" }
        });

      if (existing) {
        return res.json({ success: true, conversation: existing });
      }
    }

    const conversation = await Conversation.create({
      participants: [req.user._id, participantId],
      type,
      name: type === "group" ? name || "New Group" : undefined,
      createdBy: req.user._id
    });

    const populated = await Conversation.findById(conversation._id)
      .populate("participants", "name email avatar bio isOnline lastSeen");

    res.status(201).json({
      success: true,
      conversation: populated
    });
  } catch (error) {
    next(error);
  }
};

const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    })
      .populate("participants", "name email avatar bio isOnline lastSeen")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "name avatar" }
      })
      .sort({ updatedAt: -1 });

    res.json({ success: true, conversations });
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      participants: req.user._id
    }).populate("participants", "name email avatar bio isOnline lastSeen");

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation
};
