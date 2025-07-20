import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validate, createCategorySchema } from '../middleware/validation';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

router.post(
  '/',
  authenticateToken,
  requireAdmin,
  validate(createCategorySchema),
  CategoryController.createCategory
);

router.put('/:id', authenticateToken, requireAdmin, CategoryController.updateCategory);
router.delete('/:id', authenticateToken, requireAdmin, CategoryController.deleteCategory);

export { router as categoryRoutes };