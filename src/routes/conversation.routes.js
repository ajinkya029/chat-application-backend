const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const {
  createConversation,
  getConversations,
  getConversation
} = require("../controllers/conversation.controller");

router.use(protect);
router.get("/", getConversations);
router.post("/", createConversation);
router.get("/:id", getConversation);

module.exports = router;
