import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
  const { providerId } = req.query;
  try {
    const query = providerId ? { providerId } : {};
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTopUpTransaction = async (req: Request, res: Response) => {
    try {
        const { providerId, amount } = req.body;
        const transaction = new Transaction({
            providerId,
            description: 'Guthaben aufgeladen',
            type: 'Guthaben-Aufladung',
            amount: amount,
            status: 'Bezahlt'
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction' });
    }
}