import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
} from '../services/orderService';
import { validateJWT } from '../middleware/validateJWT';

const router = express.Router();

// Create a new order (protected route)
router.post('/', validateJWT, createOrder);

// Get all orders for the logged-in user (protected route)
router.get('/my-orders', validateJWT, getUserOrders);

// Get a single order by ID (protected route)
router.get('/:orderId', validateJWT, getOrderById);

// Update order status (admin only)
router.patch('/:orderId/status', validateJWT, updateOrderStatus);

export default router; 