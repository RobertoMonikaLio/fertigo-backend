import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer';
import Lead from '../models/Lead';
import Conversation from '../models/Conversation';

const generateToken = (id: string, role: string = 'customer') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'default_secret_key', {
        expiresIn: '30d',
    });
};

// @desc    Register new customer
// @route   POST /api/customer/register
// @access  Public
export const registerCustomer = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Bitte alle Pflichtfelder ausfüllen' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Passwort muss mindestens 8 Zeichen lang sein' });
        }

        const exists = await Customer.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: 'Diese E-Mail-Adresse ist bereits registriert' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const customer = await Customer.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone: phone || '',
        });

        res.status(201).json({
            _id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            token: generateToken(customer.id),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login customer
// @route   POST /api/customer/login
// @access  Public
export const loginCustomer = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email: email?.toLowerCase() });

        if (customer && (await bcrypt.compare(password, customer.password))) {
            res.json({
                _id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                token: generateToken(customer.id),
            });
        } else {
            res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get customer's own leads (by email)
// @route   GET /api/customer/leads
// @access  Private (Customer)
export const getMyLeads = async (req: any, res: Response) => {
    try {
        const customer = req.customer;
        const leads = await Lead.find({ 'customerInfo.email': customer.email })
            .sort({ date: -1 })
            .select('-purchasedBy'); // Don't expose which partners bought

        res.json(leads.map((lead: any) => ({
            _id: lead._id,
            title: lead.title,
            service: lead.service,
            location: lead.location,
            date: lead.date,
            status: lead.status,
            description: lead.description,
            details: lead.details,
        })));
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get customer profile
// @route   GET /api/customer/me
// @access  Private (Customer)
export const getCustomerMe = async (req: any, res: Response) => {
    try {
        const customer = req.customer;
        res.json({
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update customer profile
// @route   PUT /api/customer/me
// @access  Private (Customer)
export const updateCustomerMe = async (req: any, res: Response) => {
    try {
        const { firstName, lastName, phone } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.customer._id,
            { firstName, lastName, phone },
            { new: true }
        ).select('-password');

        res.json(customer);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Change customer password
// @route   PUT /api/customer/password
// @access  Private (Customer)
export const changeCustomerPassword = async (req: any, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const customer = await Customer.findById(req.customer._id);
        if (!customer) return res.status(404).json({ message: 'Kunde nicht gefunden' });

        const isMatch = await bcrypt.compare(currentPassword, customer.password);
        if (!isMatch) return res.status(400).json({ message: 'Aktuelles Passwort ist falsch' });

        const salt = await bcrypt.genSalt(10);
        customer.password = await bcrypt.hash(newPassword, salt);
        await customer.save();

        res.json({ message: 'Passwort erfolgreich geändert' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// =============================================================
// CONVERSATIONS / MESSAGES (Nachrichten)
// =============================================================

// @desc    Get all conversations for this customer
// @route   GET /api/customer/conversations
// @access  Private (Customer)
export const getMyConversations = async (req: any, res: Response) => {
    try {
        const customerId = req.customer._id;
        // Find by customerId OR customerEmail (for flexibility)
        const conversations = await Conversation.find({
            $or: [
                { customerId: customerId },
                { customerEmail: req.customer.email }
            ]
        }).populate('providerId', 'name').sort({ updatedAt: -1 });

        res.json(conversations.map((c: any) => {
            const obj = c.toObject();
            return {
                ...obj,
                providerName: obj.providerId?.name || 'Fachpartner'
            };
        }));
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single conversation for customer
// @route   GET /api/customer/conversations/:id
// @access  Private (Customer)
export const getMyConversationById = async (req: any, res: Response) => {
    try {
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            $or: [
                { customerId: req.customer._id },
                { customerEmail: req.customer.email }
            ]
        }).populate('providerId', 'name');

        if (!conversation) return res.status(404).json({ message: 'Konversation nicht gefunden' });

        const obj = conversation.toObject();
        res.json({
            ...obj,
            providerName: (obj.providerId as any)?.name || 'Fachpartner'
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Send a message from customer
// @route   POST /api/customer/conversations/:id/messages
// @access  Private (Customer)
export const sendCustomerMessage = async (req: any, res: Response) => {
    try {
        const { text } = req.body;
        const conversation = await Conversation.findOne({
            _id: req.params.id,
            $or: [
                { customerId: req.customer._id },
                { customerEmail: req.customer.email }
            ]
        });

        if (!conversation) return res.status(404).json({ message: 'Konversation nicht gefunden' });

        conversation.messages.push({
            sender: 'customer',
            text,
            timestamp: new Date(),
        });

        // Also ensure customerId is set if it wasn't before
        if (!conversation.customerId) {
            conversation.customerId = req.customer._id;
        }

        await conversation.save();

        res.json(conversation);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error' });
    }
};
