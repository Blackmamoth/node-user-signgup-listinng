const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const addUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    dob,
    country,
    state,
    city,
    pinCode,
  } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !phone ||
    !dob ||
    !country ||
    !state ||
    !pinCode
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
    dob: new Date(dob),
    country,
    state,
    city,
    pinCode,
  });

  if (!user) {
    res.status(400);
    throw new Error("An Error occured");
  }
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ success: "User Deleted" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill both fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user.id),
    });
  } else {
    res.json({
      message: "Invalid Credentials",
    });
  }
});

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};
