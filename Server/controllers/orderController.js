// controllers/orderController.js

const { Order, OrderItem, Product } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, status, paymentMethod } = req.body;
    console.log('ahlam',items);

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

// exports.processPayment = async (req, res) => {
//   try {
//     // Validate order ID
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: 'Invalid order ID' });
//     }

//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Validate payment method
//     if (!['cash', 'card'].includes(req.body.paymentMethod)) {
//       return res.status(400).json({ message: 'Invalid payment method' });
//     }

//     // Validate address
//     if (!req.body.address || typeof req.body.address !== 'object') {
//       return res.status(400).json({ message: 'Invalid delivery address' });
//     }

//     // Update order
//     order.paymentMethod = req.body.paymentMethod;
//     order.paymentStatus = req.body.paymentMethod === 'cash' ? 'pending' : 'paid';
//     order.address = req.body.address;
//     order.status = 'processing';

//     const updatedOrder = await order.save();

//     res.status(200).json({
//       success: true,
//       orderId: updatedOrder._id,
//       message: 'Payment processed successfully'
//     });

//   } catch (error) {
//     console.error('Payment processing error:', error);
//     res.status(500).json({ 
//       success: false,
//       message: 'Payment processing failed',
//       error: error.message 
//     });
//   }
// };
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

// Add this to your orderController.js
exports.getAllOrders = async (req, res) => {
  try {
    const { search, status, page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;
    
    let whereClause = {};
    let includeOptions = [
      {
        model: OrderItem,
        include: [Product],
        required: false
      }
    ];
    
    if (status && status !== 'all') {
      whereClause.status = status;
    }

    if (search) {
      whereClause[Op.or] = [
        { id: { [Op.like]: `%${search}%` } }
      ];
      
      // Add search to product name in include
      includeOptions[0].where = {
        [Op.or]: [
          { '$product.name$': { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      distinct: true, // Important for correct count when using includes
      limit: parseInt(pageSize),
      offset: offset,
      order: [['createdAt', 'DESC']]
    });

    // Ensure all prices are numbers
    const orders = rows.map(order => {
      return {
        ...order.get({ plain: true }),
        totalPrice: Number(order.totalPrice) || 0,
        orderItems: order.orderItems?.map(item => ({
          ...item.get({ plain: true }),
          price: Number(item.price) || 0
        })) || []
      };
    });

    res.json({
      orders,
      total: count,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};