import express from 'express';
import { getLeads, getLeadById, createLead, purchaseLead } from '../controllers/leadController';
import { getProviders, getProviderById, createProvider, updateProvider, deleteProvider, updateBalance } from '../controllers/providerController';
import { getTransactions, createTopUpTransaction } from '../controllers/transactionController';

const router = express.Router();

// Lead Routes
import Lead from '../models/Lead';
router.post('/leads/migrate-prices', async (req, res) => {
    try {
        const leads = await Lead.find();
        let updatedCount = 0;
        for (const lead of leads) {
            let newPrice = lead.price;
            switch (lead.service) {
                case 'Privatumzug': case 'Umzug': newPrice = 35; break;
                case 'Firmenumzug': newPrice = 50; break;
                case 'Möbeltransport': newPrice = 20; break;
                case 'Klaviertransport': newPrice = 50; break;
                case 'Umzugsreinigung': case 'Reinigung': newPrice = 20; break;
                case 'Malerarbeiten': newPrice = 30; break;
                case 'Sanitär': case 'Elektriker': newPrice = 45; break;
                case 'Heizungsinstallation': case 'Klimaanlagen-Service': newPrice = 60; break;
                case 'Badezimmerumbau': newPrice = 80; break;
                case 'Küchenbau': newPrice = 100; break;
                case 'Bodenleger': case 'Plattenleger': newPrice = 35; break;
                case 'Schreiner': case 'Zimmermannarbeiten': newPrice = 40; break;
                case 'Dachdecker': case 'Dachreinigung': newPrice = 70; break;
                case 'Fassadenbau': newPrice = 80; break;
                case 'Fensterreinigung': case 'Fenstermontage': newPrice = 25; break;
                case 'Gartenpflege': case 'Gartenbau': newPrice = 25; break;
                case 'Baureinigung': case 'Gebäudereinigung': newPrice = 35; break;
                case 'Entsorgung & Räumung': newPrice = 30; break;
                default: newPrice = 30;
            }
            if (lead.price !== newPrice) {
                lead.price = newPrice;
                await lead.save();
                updatedCount++;
            }
        }
        res.json({ message: `Successfully updated ${updatedCount} leads.` });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

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
