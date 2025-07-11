import express from 'express';
import { getOrders, getMyOrders, updateOrderStatus, createRazorpayOrder, confirmPayment } from '../controllers/orderController.js';
import { userProtect } from '../middleware/userProtect.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getOrders);
router.route('/my').get(userProtect, getMyOrders);
router.route('/razorpay').post(userProtect, createRazorpayOrder);
router.route('/confirm').post(userProtect, confirmPayment);
router.route('/:id/status').put(protect, updateOrderStatus);

export default router;
