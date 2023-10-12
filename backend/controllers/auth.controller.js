const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body; // get the username, email and password from the request body
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt (how many times the password is hashed)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

module.exports = { signup };
