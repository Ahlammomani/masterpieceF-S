// controllers/orderController.js

const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, status, paymentMethod } = req.body;
    console.log('ahlam',userId);

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Create the order
    const order = await Order.create({
      userId,
      totalPrice,
      status: status || 'pending',
      paymentMethod: paymentMethod || 'card'
    });

    // Create order items
    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });

      // Update product stock if needed
      const product = await Product.findByPk(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    // Fetch the complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    res.status(201).json(completeOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod, address } = req.body;

    const order = await Order.findByPk(orderId, {
      include: [OrderItem]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update order status
    order.status = paymentMethod === 'cash' ? 'processing' : 'paid';
    order.transactionId = `txn_${Date.now()}`;
    await order.save();

    // In a real app, you would integrate with a payment gateway here
    // For cash on delivery, you might just update the status
    // For card payments, you would process the payment first

    res.json({
      message: 'Payment processed successfully',
      order
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};
exports.getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Requested Order ID:", orderId);

    const userId = req.user?.id;
    console.log("Authenticated User ID:", userId);

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });

    if (!order) {
      console.log("Order not found.");
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== userId) {
      console.log("Unauthorized access attempt.");
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    console.error(error.stack);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

