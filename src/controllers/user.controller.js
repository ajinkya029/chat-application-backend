const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    const search = (req.query.search || "").trim();

    const filter = {
      _id: { $ne: req.user._id }
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(filter)
      .select("name email avatar bio isOnline lastSeen")
      .sort({ name: 1 })
      .limit(30);

    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar, bio } = req.body;

    if (name !== undefined) req.user.name = name.trim();
    if (avatar !== undefined) req.user.avatar = avatar.trim();
    if (bio !== undefined) req.user.bio = bio.trim();

    await req.user.save();

    res.json({
      success: true,
      message: "Profile updated.",
      user: req.user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, updateProfile };
