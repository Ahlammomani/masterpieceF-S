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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

// تحديث قسم
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};



module.exports = { createCategory, getCategories,updateCategory,deleteCategory };
