const express = require('express');
const router = express.Router();
const { createPayment,getPaymentDetails } = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/:orderId', authMiddleware, createPayment);
router.get('/',getPaymentDetails)

module.exports = router;