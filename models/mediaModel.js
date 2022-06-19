const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Image name required"],
  },
  data: {
    type: mongoose.SchemaTypes.Buffer,
    required: [true, "Image data required"],
  },
});

module.exports = mongoose.model("Media", mediaSchema);
