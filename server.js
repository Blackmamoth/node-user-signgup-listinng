const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/address", require("./routes/addressRoutes"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
