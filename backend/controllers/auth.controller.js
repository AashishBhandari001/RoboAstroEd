const User = require("../models/user.model.js");
const Course = require("../models/course.model.js");

const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

dotenv.config();

//config for email
const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const signup = async (req, res, next) => {
  const { username, email, password } = req.body; // get the username, email and password from the request body
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt (how many times the password is hashed)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(ErrorHandler(500, error.message));
  }
};

//signin controller function

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(ErrorHandler(404, "User does not exist"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(ErrorHandler(401, "Wrong Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validUser._doc;
    rest.token = token;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest); // send the token in a cookie
  } catch (error) {
    next(error);
  }
};

//google login controller function
const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // check if the user exists in the database
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // create a token
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest); 
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // generate a random password
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10); // hash the password
      const newUser = new User({
        username:
          req.body.name.split(" ").join(" ").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET); // create a token
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest); // send the token in a cookie
    }
  } catch (error) {
    next(error);
  }
};

const passwordreset = async (req, res, next) => {
  const { email } = req.body; // get the email from the request body
  try {
    if (!email) {
      return next(ErrorHandler(404, "Email is required"));
    }

    const validUser = await User.findOne({ email }); // check if the user exists in the database

    if (!validUser) {
      return next(ErrorHandler(404, "User does not exist"));
    }

    // Token generation for password reset
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // create a token

    const setusertoken = await User.findByIdAndUpdate(
      { _id: validUser._id },
      { resetpasswordToken: token },
      { new: true }
    );

    if (setusertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Link To Reset Password",
        html: `
        <div style="background-color: #ebf4ff; padding: 20px;">
          <h2 style="font-size: 20px; margin: 0;">Password Reset Request</h2>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px;">
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px; color: #000000 ">You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px; color: #000000">
            Please <a style="color: #007bff; text-decoration: none; font-weight: bold;" href="http://localhost:3000/forgetpassword/${validUser._id}/${setusertoken.resetpasswordToken}"><u> click here </u></a> to reset your password within 3 minutes of receiving this email.
          </p>
          <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px; color: #888;">If you did not request this, please ignore this email, and your password will remain unchanged.</p>
        </div>
      `,
      };

      const response = await transporter.sendMail(mailOptions);
      // console.log("Password reset email sent: ", response);
      res.status(200).json("Recovery email sent");
    }
  } catch (error) {
    next(error);
  }
};

//forgetpassword controller function
const forgetpassword = async (req, res, next) => {
  const { id, token } = req.params;

  const { password } = req.body; // get the password from the request body

  try {
    const validUser = await User.findOne({ _id: id }); // check if the user exists in the database

    const validToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!validUser && !validToken) {
      return next(ErrorHandler(404, "User does not exist"));
    } else {
      if (validUser && validToken) {
        const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt (how many times the password is hashed)
        const setpassword = await User.findByIdAndUpdate(
          { _id: id },
          { password: hashedPassword },
          { new: true }
        );
        if (setpassword) {
          console.log("Password updated");
          return next(ErrorHandler(200, "Password updated"));
        } else {
          console.log("Password not updated");
          return next(ErrorHandler(400, "Password not updated"));
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// logout controller
const logout = async (req, res, next) => {
  try {
    res
      .cookie("access_token", "", { httpOnly: true, expires: new Date(0) })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

//get user details controller -- admin
const getuserDetails = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      return next(ErrorHandler(`User does not exist, ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

//get all user details -- admin
const getSingleUser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id);

    if (!users) {
      return next(ErrorHandler(`User does not exist, ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

//update user role -- admin
const updateuserRole = async (req, res, next) => {
  try {
    const newUserData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//delete user -- admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(ErrorHandler(`User does not exist, ${req.params.id}`));
    }

    // Using deleteOne to remove the user from the database
    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//add to playlist
const addToPlaylist = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);

    if (!course) {
      next(ErrorHandler("invalid course id", 404));
    }

    const itemExist = user.playlist.find((item) => {
      if (item.course.toString() === course._id.toString()) return true;
    });

    if (!itemExist) {
      next(ErrorHandler("Course already added", 409));
    }
    // Ensure that user.playlist is initialized as an array
    user.playlist = user.playlist || [];

    user.playlist.push({
      course: course._id,
      poster: course.poster.url,
    });

    await user.save();

    res.status(200).json({ success: true, message: "Added to playlist" });
  } catch (error) {
    next(error);
  }
});

//remove from playlist
const removeFromPlaylist = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.query.id);

    if (!course) return next(new ErrorHandler("Invalid course id", 404));

    // Use Mongoose's pull method to remove the specified item from the array
    user.playlist.pull({ course: course._id });

    await user.save();

    res.status(200).json({ success: true, message: "Removed from playlist" });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  signup,
  signin,
  google,
  passwordreset,
  forgetpassword,
  logout,
  getuserDetails,
  getSingleUser,
  updateuserRole,
  deleteUser,
  addToPlaylist,
  removeFromPlaylist,
};
