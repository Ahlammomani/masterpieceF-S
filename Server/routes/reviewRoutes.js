const express = require('express');
const router = express.Router();
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');
const {authMiddleware}=require('../Middleware/authMiddleware')


router.post('/products/:productId/reviews',authMiddleware ,createReview);


 router.get('/products/:productId/reviews', getReviews);


// router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;