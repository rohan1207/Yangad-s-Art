import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order and return details
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount required' });
    const options = { amount, currency: 'INR', receipt: `rcpt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};

// Verify payment signature and record order
export const confirmPayment = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, items, address } = req.body;
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpaySignature)
      return res.status(400).json({ message: 'Signature verification failed' });

    // Log items to check for customization data
    console.log('Items received on backend:', JSON.stringify(items, null, 2));

    // Save order in DB
    const orderDoc = new Order({
      customerName: req.user.name,
      customerPhone: req.user.phone,
      shippingAddress: `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}`,
      items: items.map((it) => ({
        product: it._id, // Correctly reference the product ID
        qty: it.qty,
        price: it.price,
        customization: it.customization,
      })),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.qty, 0),
      paymentStatus: 'paid',
      orderStatus: 'placed',
    });
    const saved = await orderDoc.save();
    res.json({ success: true, order: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
};

// List orders (optionally filter by status)
export const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.orderStatus = req.query.status;
    const orders = await Order.find(filter).populate('items.product', 'name mainImage');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get orders for current user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerPhone: req.user.phone }).populate('items.product', 'name mainImage');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const { orderStatus, paymentStatus } = req.body;
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    console.error('Failed to update order status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
