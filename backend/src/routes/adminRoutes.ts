import express from 'express';
import { adminLogin, verifyAdmin } from '../controllers/adminController';
import {
    getDashboardStats,
    getAdminPartners,
    deleteAdminPartner,
    updatePartnerStatus,
    getAdminRequests,
    deleteAdminRequest,
    getAdminUsers,
    getAdminFinance,
    getAdminProfile,
    updateAdminProfile,
    updateAdminPassword
} from '../controllers/statsController';

const router = express.Router();

// Auth
router.post('/login', adminLogin);
router.get('/verify', verifyAdmin);

// Dashboard
router.get('/stats', getDashboardStats);

// Partners
router.get('/partners', getAdminPartners);
router.delete('/partners/:id', deleteAdminPartner);
router.put('/partners/:id/status', updatePartnerStatus);

// Requests (Leads)
router.get('/requests', getAdminRequests);
router.delete('/requests/:id', deleteAdminRequest);

// Users
router.get('/users', getAdminUsers);

// Finance
router.get('/finance', getAdminFinance);

// Profile
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);
router.put('/password', updateAdminPassword);

export default router;
