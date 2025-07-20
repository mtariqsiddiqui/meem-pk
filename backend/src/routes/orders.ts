import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, createOrderSchema } from '../middleware/validation';

const router = Router();

router.post('/', authenticateToken, validate(createOrderSchema), OrderController.createOrder);
router.get('/', authenticateToken, OrderController.getUserOrders);
router.get('/all', authenticateToken, requireAdmin, OrderController.getAllOrders);
router.get('/:id', authenticateToken, OrderController.getOrderById);
router.put('/:id/status', authenticateToken, requireAdmin, OrderController.updateOrderStatus);

export { router as orderRoutes };