import { Router } from 'express';
import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
