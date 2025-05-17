const db = require('../models');
const { Payment, Order, Delivery } = require('../models');



const createPayment = async (req, res) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    
    const { orderId } = req.params;
    const {
      paymentMethod,
      address,
      amount,
      currency,
      paypalOrderId,
      userId
    } = req.body;

    // التحقق من صحة البيانات المدخلة
    if (!paymentMethod || !address || !amount || !currency || !userId) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields' 
      });
    }

    // التحقق من وجود الطلب
    const order = await Order.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false,
        message: 'Order not found' 
      });
    }

    // التحقق من تطابق المبلغ مع إجمالي الطلب
    if (parseFloat(amount) !== parseFloat(order.totalPrice)) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false,
        message: 'Payment amount does not match order total' 
      });
    }

    // إنشاء سجل التوصيل
    const delivery = await Delivery.create({
      orderId,
      address: JSON.stringify(address),
      status: 'pending',
      city: address.city || 'Not specified',
      postalCode: address.postalCode || '00000',
      country: address.country || 'Jordan'
    }, { transaction });

    // إنشاء سجل الدفع
    const payment = await Payment.create({
      amount,
      currency,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'completed',
      paypalOrderId: paymentMethod === 'card' ? paypalOrderId : null,
      userId,
      orderId
    }, { transaction });

    // تحديث حالة الطلب
    await order.update({
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      status: 'processing',
      deliveryId: delivery.id
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      data: {
        orderId: order.id,
        paymentId: payment.id,
        deliveryId: delivery.id,
        paymentStatus: payment.paymentStatus,
        orderStatus: order.status
      }
    });

  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error('Payment processing error:', err);
    
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// دالة للحصول على تفاصيل الدفع
const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findByPk(paymentId, {
      include: [
        { model: Order, include: [Delivery] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!payment) {
      return res.status(404).json({ 
        success: false,
        message: 'Payment not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });

  } catch (err) {
    console.error('Error fetching payment details:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  createPayment,
  getPaymentDetails
};