const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/categoryController");

// POST - إنشاء قسم جديد
router.post("/", createCategory);

// GET - جلب كل الأقسام
router.get("/", getCategories);

module.exports = router;
