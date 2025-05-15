const express = require('express');
const { signup, login, logout } = require('../controllers/userController');


const router = express.Router();

// تسجيل مستخدم جديد
router.post('/signup', signup);

// تسجيل الدخول
router.post('/login', login);

// تسجيل الخروج
router.post('/logout', logout);

// راوت محمي (اختبار)
// router.get('/profile', protect, (req, res) => {
//   res.json({ message: 'مرحبًا بك في ملفك الشخصي', user: req.user });

// });

// router.put('/profile', protect,updateProfile);

// Google login
// router.post("/google-login", googleLogin);

module.exports = router;
