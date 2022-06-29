const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/address", require("./routes/addressRoutes"));
app.use("/api/resetPassword", require("./routes/resetPassRoutes"));
app.use("/api/media", require("./routes/mediaRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users/media", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users/medicines", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/resetPassword/reset/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/uploads/images/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "images", req.params.id));
  res.setHeader("content-type", "image/jpeg");
});

app.get("/uploads/videos/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "videos", req.params.id));
  res.setHeader("content-type", "video/mp4");
});

app.get("/uploads/documents/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "documents", req.params.id));
  res.setHeader("content-type", "text/plain");
});

app.get("**", (req, res) => {
  res.redirect("/users");
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
