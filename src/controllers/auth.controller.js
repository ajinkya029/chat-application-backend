const User = require("../models/User");
const createToken = require("../utils/token");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters."
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered."
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token: createToken(user._id),
      user: user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.json({
      success: true,
      message: "Login successful.",
      token: createToken(user._id),
      user: user.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeObject()
  });
};

module.exports = { register, login, me };
