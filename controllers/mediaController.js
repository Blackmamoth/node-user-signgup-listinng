const asyncHandler = require("express-async-handler");
const Media = require("../models/mediaModel");
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
  const media = await Media.create({
    name: req.file.originalname,
    data: req.file.buffer,
  });
  console.log(media);
  res.json({ success: true });
});

module.exports = { uploadImage };
