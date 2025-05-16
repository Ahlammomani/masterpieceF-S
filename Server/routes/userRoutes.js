const express = require('express');
const { signup, login, logout,getUsers,deleteUser} = require('../controllers/userController');


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

module.exports = router;
