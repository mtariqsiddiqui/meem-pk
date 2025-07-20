import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, createProductSchema } from '../middleware/validation';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/:id', ProductController.getProductById);

router.post(
  '/',
  authenticateToken,
  requireAdmin,
  validate(createProductSchema),
  ProductController.createProduct
);

router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  ProductController.updateProduct
);

router.delete(
  '/:id',
  authenticateToken,
  requireAdmin,
  ProductController.deleteProduct
);

export { router as productRoutes };