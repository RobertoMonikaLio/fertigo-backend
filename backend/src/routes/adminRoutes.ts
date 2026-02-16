import express from 'express';
import { adminLogin, verifyAdmin } from '../controllers/adminController';
import { getDashboardStats } from '../controllers/statsController';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdmin);
router.get('/stats', getDashboardStats);

export default router;
