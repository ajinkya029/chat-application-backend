const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const {
  getUsers,
  updateProfile
} = require("../controllers/user.controller");

router.use(protect);
router.get("/", getUsers);
router.patch("/profile", updateProfile);

module.exports = router;
