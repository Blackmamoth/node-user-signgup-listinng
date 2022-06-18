const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true, "Username already in use"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number required"],
    unique: [true, "Phone number already in use"],
  },
  dob: {
    type: String,
    required: [true, "DOB required"],
  },
  country: {
    type: String,
    required: [true, "Country required"],
  },
  state: {
    type: String,
    required: [true, "State required"],
  },
  city: {
    type: String,
  },
  pinCode: {
    type: Number,
    required: [true, "Pin Code required"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: String,
    enum: ['view', 'add', 'none'],
    default: 'none'
  },
  medicines: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
