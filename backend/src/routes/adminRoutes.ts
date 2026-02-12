import express from 'express';
import { adminLogin, verifyAdmin } from '../controllers/adminController';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdmin);

export default router;
