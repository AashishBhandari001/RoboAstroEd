const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const errorHandler = require("../utils/error.js");

dotenv.config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const contactus = async (req, res, next) => {
  const { fullName, email, phoneNumber, reason, messageText } = req.body;
  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: reason,
      html: `<h1>Full Name: ${fullName}</h1>
      <h1>Email: ${email}</h1>
      <h1>Phone Number: ${phoneNumber}</h1>
      <h1>Reason: ${reason}</h1>
      <h1>Message: ${messageText}</h1>`,
    };
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({
        message:
          "We have received your response and will contact you as soon as possible!",
      }); // Notify user upon successful submission
  } catch (error) {
    next(error);
  }
};

module.exports = { contactus };
