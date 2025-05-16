// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adminahlam@gmail.com",
    pass: "adminahlam@gmail.com",
  },
});

module.exports = transporter;
