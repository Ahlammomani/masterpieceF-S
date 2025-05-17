// controllers/overviewController.js
const { User, Order, Product, Payment } = require('../models');
const NodeCache = require('node-cache');
const statsCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

exports.getOverviewStats = async (req, res) => {
  try {
    // Check cache first
    const cachedStats = statsCache.get('dashboardStats');
    if (cachedStats) {
      return res.json({
        success: true,
        data: cachedStats,
        cached: true
      });
    }

    // Execute all queries in parallel
    const [users, orders, products, revenue] = await Promise.all([
      User.count(),
      Order.count(),
      Product.count(),
      Payment.sum('amount')
    ]);
    
    const stats = {
      users,
      orders,
      products,
      revenue: revenue || 0,
      timestamp: new Date()
    };
    
    // Set cache
    statsCache.set('dashboardStats', stats);
    
    res.json({
      success: true,
      data: stats,
      cached: false
    });
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};