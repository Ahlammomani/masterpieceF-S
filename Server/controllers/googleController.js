
// require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
// استيراد النموذج
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 

// exports.googleLogin = async (req, res) => {
//   try {
//     const { credential } = req.body;
// console.log("jj",credential);
//     if (!credential) {
//       return res.status(400).json({ message: "Google token is required" });
//     }

//     // Verify Google token
//     // exports.ticket = await client.verifyIdToken({
//     //   idToken: credential,
//     //   audience: process.env.GOOGLE_CLIENT_ID,
//     // });

//     // const payload = ticket.getPayload();
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
    
//     const { email, name, sub } = payload; // "sub" is the Google User ID
// console.log(payload);
//     // Check if the user already exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create new user if not found
//       // user = new User({
//       //   firstName: name,
//       //   email: email,
//       //   googleId: sub,
//       //   isActivated: true,
//       // });

//       await user.save();
//     }else{
//   const newUser = await User.create({firstName: name, email:email, googleId: sub });

//     res.status(201).json({ message: 'تم إنشاء الحساب بنجاح', User: newUser });
// }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "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", {
//       expiresIn: "1d",
//     });

//     res
//       .status(200)
//       .json({ message: "Google login successful", token, user_id: user._id });
//   } catch (error) {
//     console.error("❌ Google login error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    console.log("jj", credential);

    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    // Check if the user already exists
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create new user if not found
      user = new User({
        firstName: name.split(" ")[0], // Assuming first name is the first part of the name
        lastName: name.split(" ")[1], // Assuming last name is the second part
        email: email,
        googleId: sub,
        isActivated: true,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send response only once
    if (!res.headersSent) {
      return res.status(200).json({ message: "Google login successful", token, user_id: user.id });
    }
  } catch (error) {
    console.error("❌ Google login error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};
