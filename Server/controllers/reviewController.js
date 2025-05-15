const { Review, User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

// تحقق من التوكن واستخراج userId
// const verifyUser = (req) => {
//   try {
//     let token;

//     // 1. من الكوكيز
//     if (req.cookies?.token) {
//       token = req.cookies.token;
//     }

//     // 2. أو من الهيدر (Bearer token)
//     else if (req.headers.authorization?.startsWith('Bearer ')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) return { error: 'No token provided', status: 401 };

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (!decoded || !decoded.id) return { error: 'Invalid token', status: 401 };

//     return { userId: decoded.id };
//   } catch (err) {
//     return { error: 'Token verification failed', status: 401 };
//   }
// };


// إنشاء تقييم جديد
// في ملف reviewController.js (السيرفر)


// إنشاء تقييم جديد
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { content, rating } = req.body;
    const productId = req.params.productId;

    if (!content || !rating || !productId) {
      return res.status(400).json({
        success: false,
        error: "Content, rating and product ID are required"
      });
    }

    const review = await Review.create({
      content,
      rating,
      productId,
      userId
    });

 const fullReview = await Review.findByPk(review.id, {
  include: [{
    model: User,
    as: 'user', // ← هذا هو المفتاح
    attributes: ['id', 'firstName']
  }]
});

    res.status(201).json({
      success: true,
      data: fullReview
    });

  } catch (error) {
    console.error('🔥 Server Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};



exports.getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Fetch reviews with user details
    const reviews = await Review.findAll({
      where: { productId },
      include: [{
        model: User,
        as: 'user',  // This should be the alias for the user relation in Sequelize
        attributes: ['id', 'firstName']  // Only fetch necessary user details
      }]
    });

    if (!reviews.length) {
      return res.status(404).json({
        success: false,
        error: 'No reviews found for this product'
      });
    }

    res.status(200).json({
      success: true,
      data: reviews
    });

  } catch (error) {
    console.error('🔥 Server Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
