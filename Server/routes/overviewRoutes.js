// routes/overviewRoutes.js
const express = require('express');
const router = express.Router();
const overviewController = require('../controllers/overviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Cache middleware for 1 minute
const cacheMiddleware = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=60');
  next();
};

router.get('/stats', authMiddleware, cacheMiddleware, overviewController.getOverviewStats);

module.exports = router;