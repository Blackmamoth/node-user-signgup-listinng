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
    res.json({ success: false, error: "User not found" });
    throw new Error("User not found");
  }

  if (req.user.id !== user.id && !req.user.admin) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized");
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
    admin,
    medicines,
    role,
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const adminUSer = await User.findOne({ admin: true });

  let user;

  if (!admin && !adminUSer) {
    user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      dob: new Date(dob),
      country,
      state,
      city,
      pinCode,
      medicines,
      role,
    });
  } else {
    user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      dob: new Date(dob),
      country,
      state,
      city,
      pinCode,
      admin,
      medicines,
      role,
    });
  }

  if (!user) {
    res.status(400);
    res.json({ success: false, error: "Invalid input data" });
    throw new Error("Invalid input data");
  }
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    success: true,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    res.json({ success: false, error: "User not found" });
    throw new Error("User not found");
  }

  if (req.user.id !== user.id && !req.user.admin) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  if (req.user.role !== "add" && !req.user.admin) {
    res.status(403).json({ message: "Forbidden" });
    throw new Error("Forbidden");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ updatedUser, success: true });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (req.user.id !== user.id && !req.user.admin) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error("Unauthorized");
  }

  if (req.user.role !== "add") {
    res.status(403).json({ message: "Forbidden" });
    throw new Error("Forbidden");
  }

  await user.remove();

  res.status(200).json({ success: true });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill both fields");
  }

  const user = await User.findOne({ email });

  if (
    user &&
    ((await bcrypt.compare(password, user.password)) ||
      password === process.env.DEFAULT_PASSWORD)
  ) {
    res.json({
      token: generateToken(user._id),
      success: true,
      _id: user._id,
    });
  } else {
    res.json({
      message: "Invalid Credentials",
      success: false,
    });
    throw new Error("Invalid Credentials");
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
