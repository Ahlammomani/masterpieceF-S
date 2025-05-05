// controllers/productCategoryController.js
const { ProductCategory } = require('../models');

// إنشاء رابطة بين المنتج والفئة
const createProductCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.body;

    if (!productId || !categoryId) {
      return res.status(400).json({ error: "الرجاء توفير معرف المنتج ومعرف الفئة" });
    }

    // إنشاء رابطة بين المنتج والفئة في جدول ProductCategory
    const productCategory = await ProductCategory.create({ productId, categoryId });

    res.status(201).json(productCategory);
  } catch (error) {
    console.error('خطأ أثناء إضافة رابطة المنتج والفئة:', error);
    res.status(500).json({ error: "حدث خطأ أثناء إضافة رابطة المنتج والفئة" });
  }
};

// استرجاع الروابط بين المنتجات والفئات
const getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.json(productCategories);
  } catch (error) {
    console.error('خطأ أثناء جلب روابط المنتجات والفئات:', error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب روابط المنتجات والفئات" });
  }
};

module.exports = { createProductCategory, getProductCategories };
