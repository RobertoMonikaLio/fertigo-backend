import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Provider from '../models/Provider';
import Transaction from '../models/Transaction';
import Job from '../models/Job';
import Conversation from '../models/Conversation';
import MarketplaceListing from '../models/MarketplaceListing';
import bcrypt from 'bcryptjs';

// @desc    Get partner dashboard stats
// @route   GET /api/partner/dashboard
// @access  Private (Partner)
export const getPartnerDashboard = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;

        // Get all leads purchased by this partner
        const purchasedLeads = await Lead.find({ purchasedBy: providerId }).sort({ date: -1 });

        // Calculate stats
        const wonLeads = purchasedLeads.filter((l: any) => l.status === 'Gewonnen').length;
        const totalPurchased = purchasedLeads.length;
        const successRate = totalPurchased > 0 ? Math.round((wonLeads / totalPurchased) * 100) : 0;

        // Get transaction history for revenue calculation
        const transactions = await Transaction.find({ providerId }).sort({ date: -1 });
        const totalSpent = transactions
            .filter((t: any) => t.amount < 0)
            .reduce((sum: number, t: any) => sum + Math.abs(t.amount), 0);

        // Get available leads (not yet purchased by this partner)
        const availableLeads = await Lead.find({
            purchasedBy: { $ne: providerId },
            $expr: { $lt: [{ $size: '$purchasedBy' }, 5] }
        })
            .sort({ date: -1 })
            .limit(6)
            .select('-customerInfo');  // Don't expose customer info for unpurchased leads

        // Provider profile data
        const provider = await Provider.findById(providerId).select('-password');

        res.json({
            stats: {
                wonLeads,
                successRate: `${successRate}%`,
                totalPurchased,
                totalSpent: `CHF ${totalSpent.toFixed(0)}`,
            },
            purchasedLeads: purchasedLeads.map((lead: any) => ({
                _id: lead._id,
                title: lead.title,
                service: lead.service,
                customerName: lead.customerName,
                location: lead.location,
                date: lead.date,
                status: lead.status,
                price: lead.price,
                budget: lead.budget,
                qualityScore: lead.qualityScore,
                description: lead.description,
                details: lead.details,
                customerInfo: lead.customerInfo,
                purchaseCount: lead.purchasedBy.length,
            })),
            availableLeads: availableLeads.map((lead: any) => ({
                _id: lead._id,
                title: lead.title,
                service: lead.service,
                location: lead.location,
                date: lead.date,
                price: lead.price,
                qualityScore: lead.qualityScore,
                purchaseCount: lead.purchasedBy.length,
            })),
            provider: provider ? {
                _id: provider._id,
                name: provider.name,
                email: provider.email,
                balance: provider.balance,
            } : null,
        });
    } catch (error: any) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get leads available for purchase (marketplace)
// @route   GET /api/partner/leads/available
// @access  Private (Partner)
export const getAvailableLeads = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;
        const { service, location, search } = req.query;
        const query: any = {
            purchasedBy: { $ne: providerId },
            $expr: { $lt: [{ $size: '$purchasedBy' }, 5] }
        };

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

        const leads = await Lead.find(query)
            .sort({ date: -1 })
            .select('-customerInfo');  // Don't expose customer info

        res.json(leads.map((lead: any) => ({
            _id: lead._id,
            title: lead.title,
            service: lead.service,
            customerName: 'Vertraulich', // Don't expose name before purchase
            location: lead.location,
            date: lead.date,
            status: lead.status,
            price: lead.price,
            budget: lead.budget,
            qualityScore: lead.qualityScore,
            description: lead.description,
            details: lead.details,
            purchaseCount: lead.purchasedBy.length,
        })));
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get partner's purchased leads
// @route   GET /api/partner/leads/purchased
// @access  Private (Partner)
export const getPurchasedLeads = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;

        const leads = await Lead.find({ purchasedBy: providerId }).sort({ date: -1 });

        res.json(leads.map((lead: any) => ({
            _id: lead._id,
            title: lead.title,
            service: lead.service,
            customerName: lead.customerName,
            location: lead.location,
            date: lead.date,
            status: lead.status,
            price: lead.price,
            budget: lead.budget,
            qualityScore: lead.qualityScore,
            description: lead.description,
            details: lead.details,
            customerInfo: lead.customerInfo,
            purchaseCount: lead.purchasedBy.length,
        })));
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single lead by ID (with access check)
// @route   GET /api/partner/leads/:id
// @access  Private (Partner)
export const getPartnerLeadById = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead nicht gefunden' });
        }

        const isPurchased = lead.purchasedBy.map((id: any) => id.toString()).includes(providerId.toString());

        // If not purchased, hide customer info
        const response: any = {
            _id: lead._id,
            title: lead.title,
            service: lead.service,
            location: lead.location,
            date: lead.date,
            status: lead.status,
            price: lead.price,
            budget: lead.budget,
            qualityScore: lead.qualityScore,
            description: lead.description,
            details: lead.details,
            purchaseCount: lead.purchasedBy.length,
            isPurchased,
        };

        if (isPurchased) {
            response.customerName = lead.customerName;
            response.customerInfo = lead.customerInfo;
        } else {
            response.customerName = 'Vertraulich';
        }

        res.json(response);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Purchase a lead
// @route   POST /api/partner/leads/:id/purchase
// @access  Private (Partner)
export const purchaseLeadAsPartner = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;
        const lead = await Lead.findById(req.params.id);
        const provider = await Provider.findById(providerId);

        if (!lead || !provider) {
            return res.status(404).json({ message: 'Lead oder Partner nicht gefunden' });
        }

        if (lead.purchasedBy.map((id: any) => id.toString()).includes(providerId.toString())) {
            return res.status(400).json({ message: 'Lead bereits gekauft' });
        }

        if (lead.purchasedBy.length >= 5) {
            return res.status(400).json({ message: 'Lead ausverkauft' });
        }

        if (provider.balance < lead.price) {
            return res.status(400).json({ message: 'Ungenügendes Guthaben' });
        }

        // Execute transaction
        provider.balance -= lead.price;
        lead.purchasedBy.push(providerId);

        const transaction = new Transaction({
            providerId,
            description: `Kauf: Lead "${lead.title}" (${lead.service})`,
            type: 'Lead-Kauf',
            amount: -lead.price,
            referenceId: lead._id.toString()
        });

        await provider.save();
        await lead.save();
        await transaction.save();

        res.json({
            success: true,
            balance: provider.balance,
            lead: {
                _id: lead._id,
                title: lead.title,
                service: lead.service,
                customerName: lead.customerName,
                location: lead.location,
                date: lead.date,
                status: lead.status,
                price: lead.price,
                budget: lead.budget,
                qualityScore: lead.qualityScore,
                description: lead.description,
                details: lead.details,
                customerInfo: lead.customerInfo,
                purchaseCount: lead.purchasedBy.length,
            }
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Transaktion fehlgeschlagen' });
    }
};

// @desc    Update lead status (for purchased leads only)
// @route   PUT /api/partner/leads/:id/status
// @access  Private (Partner)
export const updateLeadStatus = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;
        const { status } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead nicht gefunden' });
        }

        const isPurchased = lead.purchasedBy.map((id: any) => id.toString()).includes(providerId.toString());
        if (!isPurchased) {
            return res.status(403).json({ message: 'Nicht autorisiert – Lead nicht gekauft' });
        }

        const validStatuses = ['Neu', 'Kontaktiert', 'Angebot gesendet', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Ungültiger Status' });
        }

        lead.status = status;
        await lead.save();

        res.json({ success: true, status: lead.status });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get partner billing info (balance + transactions)
// @route   GET /api/partner/billing
// @access  Private (Partner)
export const getPartnerBilling = async (req: any, res: Response) => {
    try {
        const providerId = req.user._id;

        const provider = await Provider.findById(providerId).select('balance');
        const transactions = await Transaction.find({ providerId }).sort({ date: -1 });

        res.json({
            balance: provider?.balance || 0,
            transactions: transactions.map((t: any) => ({
                _id: t._id,
                date: t.date,
                description: t.description,
                type: t.type,
                amount: t.amount,
                status: t.status,
                referenceId: t.referenceId,
            })),
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get partner profile
// @route   GET /api/partner/profile
// @access  Private (Partner)
export const getPartnerProfile = async (req: any, res: Response) => {
    try {
        const provider = await Provider.findById(req.user._id).select('-password');

        if (!provider) {
            return res.status(404).json({ message: 'Partner nicht gefunden' });
        }

        res.json(provider);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update partner profile
// @route   PUT /api/partner/profile
// @access  Private (Partner)
export const updatePartnerProfile = async (req: any, res: Response) => {
    try {
        const { name, email, location, services, about, contact, details } = req.body;

        const provider = await Provider.findByIdAndUpdate(
            req.user._id,
            { name, email, location, services, about, contact, details },
            { new: true, runValidators: true }
        ).select('-password');

        if (!provider) {
            return res.status(404).json({ message: 'Partner nicht gefunden' });
        }

        res.json(provider);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Change partner password
// @route   PUT /api/partner/password
// @access  Private (Partner)
export const changePartnerPassword = async (req: any, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const provider = await Provider.findById(req.user._id);
        if (!provider) {
            return res.status(404).json({ message: 'Partner nicht gefunden' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, provider.password!);
        if (!isMatch) {
            return res.status(400).json({ message: 'Aktuelles Passwort ist falsch' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        provider.password = await bcrypt.hash(newPassword, salt);
        await provider.save();

        res.json({ message: 'Passwort erfolgreich geändert' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// =============================================================
// JOBS (Stelleninserate)
// =============================================================

// @desc    Get all jobs for this partner
// @route   GET /api/partner/jobs
// @access  Private (Partner)
export const getPartnerJobs = async (req: any, res: Response) => {
    try {
        const jobs = await Job.find({ providerId: req.user._id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new job
// @route   POST /api/partner/jobs
// @access  Private (Partner)
export const createJob = async (req: any, res: Response) => {
    try {
        const { title, description, location, type, salary, status, contact } = req.body;
        const job = await Job.create({
            providerId: req.user._id,
            title, description, location, type, salary,
            status: status || 'Aktiv',
            contact,
        });
        res.status(201).json(job);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a job
// @route   PUT /api/partner/jobs/:id
// @access  Private (Partner)
export const updateJob = async (req: any, res: Response) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, providerId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!job) return res.status(404).json({ message: 'Stelle nicht gefunden' });
        res.json(job);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a job
// @route   DELETE /api/partner/jobs/:id
// @access  Private (Partner)
export const deleteJob = async (req: any, res: Response) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, providerId: req.user._id });
        if (!job) return res.status(404).json({ message: 'Stelle nicht gefunden' });
        res.json({ message: 'Stelle gelöscht' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// =============================================================
// CONVERSATIONS / MESSAGES (Nachrichten)
// =============================================================

// @desc    Get all conversations for this partner
// @route   GET /api/partner/conversations
// @access  Private (Partner)
export const getConversations = async (req: any, res: Response) => {
    try {
        const conversations = await Conversation.find({ providerId: req.user._id })
            .sort({ updatedAt: -1 });
        res.json(conversations);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single conversation
// @route   GET /api/partner/conversations/:id
// @access  Private (Partner)
export const getConversationById = async (req: any, res: Response) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            providerId: req.user._id,
        });
        if (!conversation) return res.status(404).json({ message: 'Konversation nicht gefunden' });

        // Mark as read
        if (conversation.unread) {
            conversation.unread = false;
            await conversation.save();
        }

        res.json(conversation);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Send a message in a conversation
// @route   POST /api/partner/conversations/:id/messages
// @access  Private (Partner)
export const sendMessage = async (req: any, res: Response) => {
    try {
        const { text } = req.body;
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            providerId: req.user._id,
        });
        if (!conversation) return res.status(404).json({ message: 'Konversation nicht gefunden' });

        conversation.messages.push({
            sender: 'partner',
            text,
            timestamp: new Date(),
        });
        await conversation.save();

        res.json(conversation);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// =============================================================
// MARKETPLACE LISTINGS (Marktplatz-Inserate)
// =============================================================

// @desc    Get all marketplace listings for this partner
// @route   GET /api/partner/marketplace
// @access  Private (Partner)
export const getMarketplaceListings = async (req: any, res: Response) => {
    try {
        const { type } = req.query;
        const query: any = { providerId: req.user._id };
        if (type && type !== 'Alle') {
            query.type = type;
        }
        const listings = await MarketplaceListing.find(query).sort({ createdAt: -1 });
        res.json(listings);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a marketplace listing
// @route   POST /api/partner/marketplace
// @access  Private (Partner)
export const createMarketplaceListing = async (req: any, res: Response) => {
    try {
        const { name, description, type, images, category, location, price, pricePerDay, status, contact } = req.body;
        const listing = await MarketplaceListing.create({
            providerId: req.user._id,
            name, description, type, images, category, location,
            price, pricePerDay,
            status: status || 'Aktiv',
            contact,
        });
        res.status(201).json(listing);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a marketplace listing
// @route   PUT /api/partner/marketplace/:id
// @access  Private (Partner)
export const updateMarketplaceListing = async (req: any, res: Response) => {
    try {
        const listing = await MarketplaceListing.findOneAndUpdate(
            { _id: req.params.id, providerId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!listing) return res.status(404).json({ message: 'Inserat nicht gefunden' });
        res.json(listing);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a marketplace listing
// @route   DELETE /api/partner/marketplace/:id
// @access  Private (Partner)
export const deleteMarketplaceListing = async (req: any, res: Response) => {
    try {
        const listing = await MarketplaceListing.findOneAndDelete({
            _id: req.params.id,
            providerId: req.user._id,
        });
        if (!listing) return res.status(404).json({ message: 'Inserat nicht gefunden' });
        res.json({ message: 'Inserat gelöscht' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};
