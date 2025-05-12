const { Review, User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// تحقق من التوكن واستخراج userId
const verifyUser = (req) => {
  try {
    // 1. الحصول على التوكن من الكوكيز
    const token = req.cookies.token;
    if (!token) return { error: 'No token provided', status: 401 };
    
    // 2. تحقق من التوكن
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) return { error: 'Invalid token', status: 401 };
    
    return { userId: decoded.id };
  } catch (err) {
    return { error: 'Token verification failed', status: 401 };
  }
};

// إنشاء تقييم جديد
// في ملف reviewController.js (السيرفر)
exports.createReview = async (req, res) => {
  try {
    // التحقق من المستخدم أولاً
    const { userId, error, status } = verifyUser(req);
    if (error) {
      return res.status(status || 401).json({ 
        success: false, 
        error 
      });
    }

    const { content, rating, productId } = req.body;
    
    // تحقق من وجود جميع البيانات المطلوبة
    if (!content || !rating || !productId) {
      return res.status(400).json({
        success: false,
        error: "Content, rating and product ID are required"
      });
    }

    // أنشئ المراجعة باستخدام userId من verifyUser
    const review = await Review.create({
      content,
      rating,
      productId,
      userId: userId // استخدم userId من verifyUser
    });

    // أعد الاستجابة مع بيانات كاملة
    const fullReview = await Review.findByPk(review.id, {
      include: [{
        model: User,
        attributes: ['id', 'username']
      }]
    });

    res.status(201).json({
      success: true,
      data: fullReview
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports. getReviwe =async(req,res)=>{
  
}