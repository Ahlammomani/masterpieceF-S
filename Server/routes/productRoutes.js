
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createProduct, getProducts } = require("../controllers/productController");

// إعداد مكان حفظ الصورة واسمها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // تأكد إن المجلد موجود
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم عشوائي
  },
});

const upload = multer({ storage: storage });

// POST منتج جديد
router.post("/", upload.array("image", 5), createProduct);

// GET كل المنتجات
router.get("/", getProducts);

module.exports = router;
