const Cart = require('../models/Cart');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// مساعد لاستخراج اليوزر من الكوكي
const getUserIdFromCookie = (req) => {
  const token = req.cookies.jwt; // افترضنا أن اسم الكوكي هو jwt
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    return null;
  }
};

// الحصول على محتويات الكارت
exports.getCartItems = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const cartItems = await Cart.findAll({
      where: { userId },
      include: 'Product'
    });

    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// إضافة منتج إلى الكارت
exports.addToCart = async (req, res) => {
   try {
    // التحقق من وجود مستخدم مسجل
    if (!req.userId) { // افترضنا أنك تحصل على userId من middleware المصادقة
      return res.status(401).json({ 
        error: 'Unauthorized',
        loginRequired: true
      });
    }

    const { productId, quantity } = req.body;

    // ... باقي منطق الإضافة للسلة
    res.status(200).json({ success: true, cartItem });
  } catch (err) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
};

// تحديث كمية منتج في الكارت
exports.updateCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { quantity } = req.body;
    const cartItem = await Cart.findByPk(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    if (cartItem.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const product = await Product.findByPk(cartItem.productId);
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// حذف منتج من الكارت
exports.removeCartItem = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const cartItem = await Cart.findByPk(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    if (cartItem.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};