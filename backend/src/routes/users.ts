import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, requireAdmin, UserController.getAllUsers);
router.get('/:id', authenticateToken, requireAdmin, UserController.getUserById);
router.put('/:id/role', authenticateToken, requireAdmin, UserController.updateUserRole);
router.delete('/:id', authenticateToken, requireAdmin, UserController.deleteUser);

export { router as userRoutes };