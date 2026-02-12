import express, { Request, Response } from 'express';
import { createGateway, getGateway } from '../services/payrexx';
import Provider from '../models/Provider';
import Transaction from '../models/Transaction';

const router = express.Router();

// POST /api/payment/create-gateway - Create a Payrexx payment gateway
router.post('/create-gateway', async (req: Request, res: Response) => {
  try {
    const { providerId, amount } = req.body;

    if (!providerId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'providerId and positive amount required' });
    }

    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const gateway = await createGateway({
        amount: parseFloat(amount),
        referenceId: providerId,
        purpose: `Fertigo-Guthaben-CHF-${parseFloat(amount).toFixed(2)}`,
        successRedirectUrl: `${frontendUrl}/partner/billing?payment=success&amount=${amount}`,
        failedRedirectUrl: `${frontendUrl}/partner/billing?payment=failed`,
        cancelRedirectUrl: `${frontendUrl}/partner/billing?payment=cancelled`,
      });

    res.json({ gatewayId: gateway.id, paymentUrl: gateway.link });
  } catch (error: any) {
    console.error('Payrexx gateway error:', error.message);
    res.status(500).json({ message: error.message || 'Payment gateway creation failed' });
  }
});

// POST /api/payment/webhook - Payrexx webhook callback
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { transaction } = req.body;

    if (!transaction) {
      return res.status(400).json({ message: 'No transaction data' });
    }

    const status = transaction.status;
    const referenceId = transaction.referenceId; // providerId
    const amount = transaction.amount / 100; // Payrexx sends amount in cents

    if (status === 'confirmed') {
      // Update provider balance
      const provider = await Provider.findById(referenceId);
      if (provider) {
        provider.balance = (provider.balance || 0) + amount;
        await provider.save();

        // Create transaction record
        const txn = new Transaction({
          providerId: referenceId,
          description: 'Guthaben aufgeladen (Payrexx)',
          type: 'Guthaben-Aufladung',
          amount: amount,
          status: 'Bezahlt',
        });
        await txn.save();
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// GET /api/payment/verify/:gatewayId - Verify payment status
router.get('/verify/:gatewayId', async (req: Request, res: Response) => {
  try {
    const gatewayId = parseInt(req.params.gatewayId);
    const gateway = await getGateway(gatewayId);

    const isPaid = gateway.status === 'confirmed';

    if (isPaid && gateway.referenceId) {
      // Ensure balance is updated (idempotent)
      const provider = await Provider.findById(gateway.referenceId);
      if (provider) {
        const amount = gateway.amount / 100;
        // Check if transaction already exists to avoid double credit
        const existing = await Transaction.findOne({
          providerId: gateway.referenceId,
          description: `Guthaben aufgeladen (Payrexx)`,
          amount: amount,
          createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }, // within last 5 min
        });

        if (!existing) {
          provider.balance = (provider.balance || 0) + amount;
          await provider.save();

          const txn = new Transaction({
            providerId: gateway.referenceId,
            description: 'Guthaben aufgeladen (Payrexx)',
            type: 'Guthaben-Aufladung',
            amount: amount,
            status: 'Bezahlt',
          });
          await txn.save();
        }
      }
    }

    res.json({ paid: isPaid, status: gateway.status });
  } catch (error: any) {
    console.error('Verify error:', error.message);
    res.status(500).json({ message: 'Verification failed' });
  }
});

export default router;
