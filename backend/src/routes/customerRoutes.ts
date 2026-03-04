import express from 'express';
import { protectCustomer } from '../middleware/customerAuthMiddleware';
import {
    registerCustomer,
    loginCustomer,
    getMyLeads,
    getCustomerMe,
    updateCustomerMe,
    changeCustomerPassword,
    getMyConversations,
    getMyConversationById,
    sendCustomerMessage,
} from '../controllers/customerController';

const router = express.Router();

// Public
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

// Protected
router.get('/me', protectCustomer, getCustomerMe);
router.put('/me', protectCustomer, updateCustomerMe);
router.put('/password', protectCustomer, changeCustomerPassword);
router.get('/leads', protectCustomer, getMyLeads);

// Messaging
router.get('/conversations', protectCustomer, getMyConversations);
router.get('/conversations/:id', protectCustomer, getMyConversationById);
router.post('/conversations/:id/messages', protectCustomer, sendCustomerMessage);

export default router;
