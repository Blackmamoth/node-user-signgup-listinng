const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Token = require("../models/token");
const nodemailer = require("nodemailer");

const sendMail = (to, msg) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testmyjarvis@gmail.com",
      pass: "pivalvehsnbztqrw",
    },
  });

  const mailOptions = {
    from: "testmyjarvis@gmail.com",
    to: to,
    subject: "Password Reset Link",
    text: msg,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    return info.response;
  });
};

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("No User Found");
  }

  const token = await Token.create({ userID: user.id });

  const msg = `You can reset your password on this link\n\nhttp://localhost:5000/resetPassword/reset/${token._id}\n\nThis link will expire in 5 minutes.`;

  res.status(200).json({ token });
});

const resetPassword = asyncHandler(async (req, res) => {
  const tokenID = req.params.tokenID;

  const { password } = req.body;

  const token = await Token.findById(tokenID);

  if (!token) {
    res.status(400);
    res.json({ message: "Token is either invalid or expired" });
    throw new Error("Token is either invalid or expired");
  }

  const newHashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

  const updatedUser = await User.findOneAndUpdate(
    { _id: token.userID },
    { password: newHashedPassword },
    { new: true }
  );

  await token.remove();
  res.status(201).json(updatedUser);
});

module.exports = { forgotPassword, resetPassword };
