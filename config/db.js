const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb://localhost/users_listing",
      {
        useNewUrlParser: true,
      },
      () => {
        console.log("Connected");
      }
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
