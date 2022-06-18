const asyncHandler = require("express-async-handler");

const uploadImage = asyncHandler(async (req, res) => {
  console.log("hit media");
  console.log(req.body, req.files);
  res.json({ success: true });
});

module.exports = { uploadImage };
