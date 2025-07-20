import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validate, registerSchema, loginSchema } from '../middleware/validation';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);

export { router as authRoutes };