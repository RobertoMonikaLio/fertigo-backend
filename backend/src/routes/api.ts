import express from 'express';
import { getLeads, getLeadById, createLead, purchaseLead } from '../controllers/leadController';
import { getProviders, getProviderById, createProvider, updateProvider, deleteProvider, updateBalance } from '../controllers/providerController';
import { getTransactions, createTopUpTransaction } from '../controllers/transactionController';

const router = express.Router();

// Lead Routes
router.get('/leads', getLeads);
router.get('/leads/:id', getLeadById);
router.post('/leads', createLead);
router.post('/leads/:id/purchase', purchaseLead);

// Provider Routes
router.get('/providers', getProviders);
router.get('/providers/:id', getProviderById);
router.post('/providers', createProvider);
router.put('/providers/:id', updateProvider); // PUT-Route hinzugefügt
router.delete('/providers/:id', deleteProvider); // DELETE-Route hinzugefügt
router.post('/providers/:id/balance', updateBalance);

// Transaction Routes
router.get('/transactions', getTransactions);
router.post('/transactions/topup', createTopUpTransaction);

export default router;
