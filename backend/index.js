const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");

dotenv.config(); // Initialize dotenv

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

const app = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads

// Define your routes before starting the server
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    error: message,
  });
});
