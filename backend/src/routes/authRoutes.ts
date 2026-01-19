import express from 'express';
import { registerProvider, loginProvider, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerProvider);
router.post('/login', loginProvider);
router.get('/me', protect, getMe);

export default router;