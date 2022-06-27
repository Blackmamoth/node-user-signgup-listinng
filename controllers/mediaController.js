const asyncHandler = require("express-async-handler");
const { Media, Video, Document } = require("../models/mediaModel");
const fs = require("fs");
const path = require("path");

const uploadImage = asyncHandler(async (req, res) => {
  const obj = {
    name: req.file.filename,
    user: req.user._id,
  };
  console.log(req.file);
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
    user: req.user._id,
  };
  const userVideo = await Video.findOne({ user: req.user.id });
  if (userVideo) {
    const newImage = await Video.findByIdAndUpdate(userVideo._id, obj, {
      new: true,
    });
    const previousVideoPath = path.join("uploads", "videos", userVideo.name);
    fs.unlink(previousVideoPath, (err) => {
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

const uploadDocument = asyncHandler(async (req, res) => {
  const obj = {
    name: req.file.filename,
    user: req.user._id,
  };
  const userDocument = await Document.findOne({ user: req.user.id });
  if (userDocument) {
    const newImage = await Document.findByIdAndUpdate(userDocument._id, obj, {
      new: true,
    });
    const previousDocumentPath = path.join(
      "uploads",
      "documents",
      userDocument.name
    );
    fs.unlink(previousDocumentPath, (err) => {
      if (err) throw err;
    });
    return res.status(200).json({ success: true, updated: true });
  }
  const newDocument = await Document.create(obj);
  if (!newDocument) {
    res.status(400).json({ success: false });
    throw new Error("An error occured");
  }
  res.status(201).json({ success: true, new: true });
});

const getDocument = asyncHandler(async (req, res) => {
  const userDocument = await Document.findOne({ user: req.body.id });
  res.json(userDocument);
});

module.exports = {
  uploadImage,
  getImage,
  uploadVideo,
  getVideo,
  uploadDocument,
  getDocument,
};
