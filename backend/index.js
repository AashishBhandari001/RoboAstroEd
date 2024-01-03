const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cloudinary = require("./utils/cloudinary.js");

const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const contactRouter = require("./routes/contact.route.js");
const product = require("./routes/product.route.js");
const order = require("./routes/order.route.js");
const courses = require("./routes/course.route.js");

const errorMiddleware = require("./middleware/error.js");
const cors = require("cors");
const errorHandler = require("./utils/error.js");
const cookieParser = require("cookie-parser");
const isAuthenticatedUser = require("./middleware/auth.js");

dotenv.config(); // Initialize dotenv

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connected to MongoDB!!");
});

const app = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("uploads"));

// Define your routes before starting the server
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
// Path: backend/routes/product.route.js
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api", courses);

//mongodb error handling
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new errorHandler(message, 400);
    return next(err);
  }

  // Pass the error to the next error handling middleware
  next(err);
});

const server = app.listen(8080, () => {
  console.log("Server is running on port 8080!!");
});

app.use(errorMiddleware);

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

// //cloudinary connection
// cloudinary.api.ping(function (error, response) {
//   if (error) {
//     console.error("Cloudinary is not connected:", error.message);
//   } else {
//     console.log("Cloudinary is connected", response);
//   }
// });
