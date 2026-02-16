import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
    getPartnerDashboard,
    getAvailableLeads,
    getPurchasedLeads,
    getPartnerLeadById,
    purchaseLeadAsPartner,
    updateLeadStatus,
    getPartnerBilling,
    getPartnerProfile,
    updatePartnerProfile,
    changePartnerPassword,
} from '../controllers/partnerController';

const router = express.Router();

// All routes require partner authentication
router.use(protect);

// Dashboard
router.get('/dashboard', getPartnerDashboard);

// Leads
router.get('/leads/available', getAvailableLeads);
router.get('/leads/purchased', getPurchasedLeads);
router.get('/leads/:id', getPartnerLeadById);
router.post('/leads/:id/purchase', purchaseLeadAsPartner);
router.put('/leads/:id/status', updateLeadStatus);

// Billing
router.get('/billing', getPartnerBilling);

// Profile
router.get('/profile', getPartnerProfile);
router.put('/profile', updatePartnerProfile);
router.put('/password', changePartnerPassword);

export default router;
