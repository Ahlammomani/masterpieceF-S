
const express = require('express');
const router = express.Router();
const { createProductCategory, getProductCategories ,getProductsByCategory} = require('../controllers/ProductCategoryController');


router.post('/', createProductCategory);


router.get('/', getProductCategories);

router.get('/products', getProductsByCategory);

module.exports = router;
