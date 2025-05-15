const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateRegisterInput, validateLoginInput } = require('../utils/validation');


exports.signup = async (req, res) => {
  // التحقق من الصحة باستخدام Joi

  const { error } = validateRegisterInput(req.body);
  if (error) {
    return res.status(400).json({ 
      message: "Validation error",
      errors: error.details.map(err => err.message)
    });
  }

  const { firstName, email,lastName, password,phoneNumber } = req.body;
  console.log("🔴 Received data:", req.body);

 try {
  const existingUser = await User.findOne({ where: { email } }); // تحديد `where` بشكل صحيح
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, email,phoneNumber,lastName, password: hashedPassword });

    if (email === "adminahlam@gmail.com") {
      user.isAdmin = true;
    }

    await user.save();
    console.log("✅ User registered:", user.firstName);

    // إنشاء التوكن
    const token = jwt.sign(
      { userId: user.id, firstName: user.firstName, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // إعداد الكوكيز
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      sameSite: 'strict'
    });
       res.cookie('userId', user.id, {
  httpOnly: false, // ⚠️ Don't use httpOnly here if frontend needs to access it
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'strict'
});


    res.status(201).json({
      message: "User registered successfully",
      token,
      firstName: user.firstName,
      email: user.email,
      userId: user._id,
      isAdmin: user.isAdmin,
    });

  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  // التحقق من الصحة باستخدام Joi
  const { error } = validateLoginInput(req.body);
  if (error) {
    return res.status(400).json({ 
      message: "Validation error",
      errors: error.details.map(err => err.message)
    });
  }

  const { email, password } = req.body;
  console.log("🔵 Login attempt with email:", email);

  try {
   const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (email === "adminahlam@gmail.com") {
      user.isAdmin = true;
      await user.save();
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin, firstName: user.firstName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // إعداد الكوكيز بشكل آمن
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      sameSite: 'strict'
    });
    res.cookie('userId', user.id, {
  httpOnly: false, // ⚠️ Don't use httpOnly here if frontend needs to access it
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'strict'
});

    console.log(`✅ User logged in: ${user.firstName} (Admin: ${user.isAdmin})`);

    return res.json({
      message: "Logged in",
      firstName: user.firstName,
      token,
      email: user.email,
      userId: user._id,
      isAdmin: user.isAdmin,
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.clearCookie('userId', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json({ message: "Logged out successfully" });
};