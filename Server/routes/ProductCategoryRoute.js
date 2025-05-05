// routes/productCategoryRoutes.js
const express = require('express');
const router = express.Router();
const { createProductCategory, getProductCategories } = require('../controllers/ProductCategoryController');

// مسار لإنشاء رابطة بين المنتج والفئة
router.post('/', createProductCategory);

// مسار لاسترجاع جميع روابط المنتجات والفئات
router.get('/', getProductCategories);

module.exports = router;
