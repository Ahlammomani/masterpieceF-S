
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createProduct, getProducts , getProductById,getSimilarProducts} = require("../controllers/productController");

// إعداد مكان حفظ الصورة واسمها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
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

router.get('/:id', getProductById);

router.get('/:id/similar', getSimilarProducts);

module.exports = router;
