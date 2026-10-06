const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const {
  getMessages,
  createMessage,
  markConversationRead
} = require("../controllers/message.controller");

router.use(protect);
router.get("/:conversationId", getMessages);
router.post("/:conversationId", createMessage);
router.patch("/:conversationId/read", markConversationRead);

module.exports = router;
