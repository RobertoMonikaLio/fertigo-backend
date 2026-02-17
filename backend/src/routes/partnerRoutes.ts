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
    // Jobs
    getPartnerJobs,
    createJob,
    updateJob,
    deleteJob,
    // Conversations
    getConversations,
    getConversationById,
    sendMessage,
    // Marketplace
    getMarketplaceListings,
    createMarketplaceListing,
    updateMarketplaceListing,
    deleteMarketplaceListing,
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

// Jobs
router.get('/jobs', getPartnerJobs);
router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// Conversations / Messages
router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversationById);
router.post('/conversations/:id/messages', sendMessage);

// Marketplace Listings (used by both Marketplace and Rent pages)
router.get('/marketplace', getMarketplaceListings);
router.post('/marketplace', createMarketplaceListing);
router.put('/marketplace/:id', updateMarketplaceListing);
router.delete('/marketplace/:id', deleteMarketplaceListing);

export default router;
