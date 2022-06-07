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
  phone: {
    type: Number,
    required: [true, "Phone number required"],
    unique: [true, "Phone number already in use"],
  },
  dob: {
    type: Date,
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
    required: [true, "City required"],
  },
  pinCode: {
    type: Number,
    required: [true, "Pin code required"],
  },
});

module.exports = mongoose.model("User", userSchema);
