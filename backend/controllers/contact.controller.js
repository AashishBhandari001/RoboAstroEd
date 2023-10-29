const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
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

  console.log(req.body);
};

module.exports = { contactus };
