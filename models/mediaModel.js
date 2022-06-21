const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Image name required"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "User for media required"],
    unique: [true, "One user can have only one profile pic"],
  },
});

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Video name required"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "User for media required"],
    unique: [true, "One user can have only one video"],
  },
});

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Document name required"],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "User for media required"],
    unique: [true, "One user can have only one document"],
  },
});

const Media = mongoose.model("Images", imageSchema);
const Video = mongoose.model("Videos", videoSchema);
const Document = mongoose.model("Document", documentSchema);

module.exports = {
  Media,
  Video,
  Document,
};
