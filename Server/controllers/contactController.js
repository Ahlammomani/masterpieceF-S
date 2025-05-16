const { Contact } = require("../models");
const transporter = require("../mailer/mailer");
const { User } = require("../models"); // تأكد أن نموذج المستخدم معرف في Sequelize

const addMessages = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Contact.create({
      name,
      email,
      message,
      status: "Unread",
    });

    return res.status(201).json({ message: "Message added successfully", data: newMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll();
    return res.status(200).json({ data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Contact.update(
      { status: "Read" },
      { where: { id }, returning: true }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({ message: "Message status updated successfully", data: updated[1][0] });
  } catch (error) {
    console.error("Error updating message status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const replyToContact = async (req, res) => {
  try {
    const { messageId, replyMessage } = req.body;

    if (!messageId || !replyMessage) {
      return res.status(400).json({ error: "Both message ID and reply are required" });
    }

    const contact = await Contact.findByPk(messageId);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }

    contact.adminReply = replyMessage;
    await contact.save();

    const mailOptions = {
      from: 'adminahlam@gmail.com',
      to: contact.email,
      subject: 'Reply to your message',
      text: replyMessage,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      console.log('Email sent:', info.response);

      try {
        const user = await User.findOne({ where: { email: contact.email } });
        if (user) {
          await user.save();
        }
      } catch (error) {
        console.error("User update error:", error);
      }

      return res.status(200).json({ success: true, message: "Reply sent successfully" });
    });
  } catch (error) {
    console.error("replyToContact error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addMessages, getMessages, updateMessageStatus, replyToContact };
