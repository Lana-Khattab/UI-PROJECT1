const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  markOrderAsPaid,
  cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, createOrder);

router.get('/', protect, getUserOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/status', protect, updateOrderStatus);

router.put('/:id/pay', protect, markOrderAsPaid);

router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
