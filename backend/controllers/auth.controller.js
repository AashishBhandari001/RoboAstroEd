const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

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

const signin = async (req, res, next) => {
  const { email, password } = req.body; // get the username, email and password from the request body
  try {
    const validUser = await User.findOne({ email }); // check if the user exists in the database
    if (!validUser) return next(errorHandler(404, "User does not exist")); // if not, return an error)) {
    const validPassword = bcrypt.compareSync(password, validUser.password); // check if the password is valid
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials")); // if not, return an error
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // create a token
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest); // send the token in a cookie
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };