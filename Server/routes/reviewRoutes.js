const express = require('express');
const router = express.Router();
const { createReview, getProductReviews, deleteReview } = require('../controllers/reviewController');


router.post('/products/:productId/reviews', createReview);


// router.get('/products/:productId/reviews', getProductReviews);


// router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;