// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Adminahlam1@gmail.com",
    pass: "Ahlamadmin123!!",
  },
});

module.exports = transporter;
