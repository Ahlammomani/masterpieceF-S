// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {authMiddleware} = require('../Middleware/authMiddleware');

router.post('/', orderController.createOrder);
// router.post('/:orderId/pay',  orderController.processPayment);
router.get('/:orderId', authMiddleware , orderController.getOrder);
// Add these to your orderRoutes.js
router.get('/',  orderController.getAllOrders);

module.exports = router;