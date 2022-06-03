const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
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
  const { username, email, phone, dob } = req.body;

  if (!username || !email || !phone || !dob) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.create({ username, email, phone, dob });

  if (!user) {
    res.status(400);
    throw new Error("An Error occured");
  }
  res.status(201).json(user);
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

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
