import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { login, getMe } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Try again later.' },
});

router.post('/login', loginLimiter, login);
router.get('/me', authMiddleware, getMe);

export default router;
