const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
