const multer = require('multer');
const path = require('path');

// تحديد مكان حفظ الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // حفظ الملفات داخل مجلد "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});

// فلترة الملفات المقبولة (مثلاً: صور فقط)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('الملف يجب أن يكون صورة بصيغة JPEG أو PNG'), false);
  }
};

// إعدادات multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // الحد الأقصى للحجم: 5MB
  fileFilter: fileFilter
});

module.exports = upload;
