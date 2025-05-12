const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/', getCartItems);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

module.exports = router;