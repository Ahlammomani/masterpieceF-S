const express = require('express');
const { signup, login, logout,getUsers,deleteUser,updateProfile,getProfile} = require('../controllers/userController');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

// تسجيل مستخدم جديد
router.post('/signup', signup);

// تسجيل الدخول
router.post('/login', login);

// تسجيل الخروج
router.post('/logout', logout);

router.get('/allusers', getUsers);

// حذف مستخدم
router.delete('/user/:userId', deleteUser);


// راوت محمي (اختبار)
router.get('/profile', authMiddleware , getProfile);
router.put('/profile', authMiddleware , updateProfile);

module.exports = router;
