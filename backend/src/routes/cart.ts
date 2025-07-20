import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { authenticateToken } from '../middleware/auth';
import { validate, addToCartSchema } from '../middleware/validation';

const router = Router();

router.get('/', authenticateToken, CartController.getCart);
router.post('/', authenticateToken, validate(addToCartSchema), CartController.addToCart);
router.put('/:id', authenticateToken, CartController.updateCartItem);
router.delete('/:id', authenticateToken, CartController.removeFromCart);
router.delete('/', authenticateToken, CartController.clearCart);

export { router as cartRoutes };