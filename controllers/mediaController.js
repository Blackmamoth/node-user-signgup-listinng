const asyncHandler = require("express-async-handler");
const { Media, Video } = require("../models/mediaModel");
const fs = require("fs");
const path = require("path");

const writeFile = (buffer, ext) => {
  const filePath = path.join(__dirname, `file.${ext}`);
  fs.writeFile(filePath, buffer, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};

const uploadImage = asyncHandler(async (req, res) => {
  const obj = {
    name: req.file.filename,
    user: req.user.id,
  };
  const userImage = await Media.findOne({ user: req.user.id });
  if (userImage) {
    const newImage = await Media.findByIdAndUpdate(userImage._id, obj, {
      new: true,
    });
    const previousImagePath = path.join("uploads", "images", userImage.name);
    fs.unlink(previousImagePath, (err) => {
      if (err) throw err;
    });
    return res.status(200).json({ success: true, updated: true });
  }
  const newImage = await Media.create(obj);
  if (!newImage) {
    res.status(400).json({ success: false });
    throw new Error("An error occured");
  }
  res.status(201).json({ success: true, new: true });
});

const getImage = asyncHandler(async (req, res) => {
  const image = await Media.findOne({ user: req.body.id });
  res.json(image);
});

const uploadVideo = asyncHandler(async (req, res) => {
  const obj = {
    name: req.file.filename,
    user: req.user.id,
  };
  const userImage = await Video.findOne({ user: req.user.id });
  if (userImage) {
    const newImage = await Video.findByIdAndUpdate(userImage._id, obj, {
      new: true,
    });
    const previousImagePath = path.join("uploads", "videos", userImage.name);
    fs.unlink(previousImagePath, (err) => {
      if (err) throw err;
    });
    return res.status(200).json({ success: true, updated: true });
  }
  const newImage = await Video.create(obj);
  if (!newImage) {
    res.status(400).json({ success: false });
    throw new Error("An error occured");
  }
  res.status(201).json({ success: true, new: true });
});

const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findOne({ user: req.body.id });
  res.json(video);
});

module.exports = { uploadImage, getImage, uploadVideo, getVideo };
