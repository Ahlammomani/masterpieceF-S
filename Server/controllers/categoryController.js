const { Category } = require("../models");

// إنشاء قسم جديد
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "الاسم مطلوب" });
    }

    const newCategory = await Category.create({ name});
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("خطأ أثناء إنشاء القسم:", error);
    res.status(500).json({ error: "فشل في إنشاء القسم" });
  }
};

// جلب جميع الأقسام
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("خطأ أثناء جلب الأقسام:", error);
    res.status(500).json({ error: "فشل في جلب الأقسام" });
  }
};

module.exports = { createCategory, getCategories };
