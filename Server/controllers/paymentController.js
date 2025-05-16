const { Payment, Order } = require('../models');

const createPayment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { orderId } = req.params;
    const {
      paymentMethod,
      address,
      amount,
      currency,
      paypalOrderId,
      userId
    } = req.body;

    // Validate order exists
    const order = await Order.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate payment amount matches order total
    if (parseFloat(amount) !== parseFloat(order.totalPrice)) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Payment amount does not match order total' });
    }

    // Create payment record
    const payment = await Payment.create({
      amount,
      currency,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'completed',
      paypalOrderId: paymentMethod === 'card' ? paypalOrderId : null,
      userId,
      orderId,
      address: JSON.stringify(address)
    }, { transaction });

    // Update order status
    await order.update({
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      status: 'processing',
      address: JSON.stringify(address)
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      orderId: order.id,
      paymentId: payment.id
    });

  } catch (err) {
    await transaction.rollback();
    console.error('Payment Error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Payment processing failed',
      error: err.message 
    });
  }
};

module.exports = { createPayment };