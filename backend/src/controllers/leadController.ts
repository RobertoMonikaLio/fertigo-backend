import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Provider from '../models/Provider';
import Transaction from '../models/Transaction';

// Get all leads (with filters)
export const getLeads = async (req: Request, res: Response) => {
  try {
    const { service, location, search } = req.query;
    const query: any = {};

    if (service && service !== 'Alle') {
      query.service = service;
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Exclude leads already purchased by this provider (assuming providerId comes from auth/header in real app)
    // For demo purposes, we return all
    const leads = await Lead.find(query).sort({ date: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single lead
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new lead (Customer)
export const createLead = async (req: Request, res: Response) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Purchase a lead (Partner)
export const purchaseLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { providerId } = req.body; // Should come from auth token in production

  try {
    const lead = await Lead.findById(id);
    const provider = await Provider.findById(providerId);

    if (!lead || !provider) {
      return res.status(404).json({ message: 'Lead or Provider not found' });
    }

    if (lead.purchasedBy.includes(providerId)) {
      return res.status(400).json({ message: 'Lead already purchased' });
    }

    if (lead.purchasedBy.length >= 5) {
        return res.status(400).json({ message: 'Lead sold out' });
    }

    // Check Balance
    if (provider.balance < lead.price) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Execute Transaction
    provider.balance -= lead.price;
    lead.purchasedBy.push(providerId);

    const transaction = new Transaction({
      providerId,
      description: `Kauf: Lead #${lead._id} (${lead.service})`,
      type: 'Lead-Kauf',
      amount: -lead.price,
      referenceId: lead._id.toString()
    });

    await provider.save();
    await lead.save();
    await transaction.save();

    res.json({ success: true, lead, balance: provider.balance });

  } catch (error) {
    res.status(500).json({ message: 'Transaction failed' });
  }
};