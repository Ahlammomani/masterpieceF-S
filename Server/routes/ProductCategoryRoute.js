
const express = require('express');
const router = express.Router();
const { createProductCategory, getProductCategories } = require('../controllers/ProductCategoryController');


router.post('/', createProductCategory);


router.get('/', getProductCategories);

module.exports = router;
