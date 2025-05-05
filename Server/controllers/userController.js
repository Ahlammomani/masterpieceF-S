const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Google login
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify Google token
    exports.ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // "sub" is the Google User ID

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not found
      user = new User({
        username: name,
        email: email,
        googleId: sub,
        isActivated: true,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ message: "Google login successful", token, user_id: user._id });
  } catch (error) {
    console.error("❌ Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





// 🟢 تسجيل مستخدم جديد
exports.signup = async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;

    // التحقق إذا كان المستخدم موجودًا بالفعل
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const newUser = await User.create({ lastName,firstName, email, password: hashedPassword });

    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب', error: error.message });
  }
};

// 🟢 تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // إنشاء التوكن
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    // حفظ التوكن في الكوكيز
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: 'تم تسجيل الدخول بنجاح', token });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول', error: error.message });
  }
};

// 🟢 تسجيل الخروج
exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
};

// 🟢 حماية الراوتات باستخدام JWT
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'غير مصرح لك بالوصول، قم بتسجيل الدخول' });
    }

    // فك تشفير التوكن والتحقق منه
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // إضافة بيانات المستخدم إلى الطلب
    next();
  } catch (error) {
    res.status(401).json({ message: 'جلسة غير صالحة، يرجى تسجيل الدخول مجددًا' });
  }
};
