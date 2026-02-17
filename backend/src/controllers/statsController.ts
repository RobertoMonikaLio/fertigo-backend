import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Provider from '../models/Provider';
import Transaction from '../models/Transaction';
import Admin from '../models/Admin';
import bcrypt from 'bcryptjs';

// @desc    Get dashboard statistics (real data from DB)
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        // --- KPI: Total Partners ---
        const totalPartners = await Provider.countDocuments();

        // --- KPI: New Partners (last 30 days) ---
        const newPartners30d = await Provider.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        // --- KPI: New Partners (previous 30 days, for comparison) ---
        const newPartnersPrev30d = await Provider.countDocuments({
            createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
        });

        // --- KPI: Total Leads ---
        const totalLeads = await Lead.countDocuments();

        // --- KPI: Leads purchased (total) - count all entries in purchasedBy arrays ---
        const leadsPurchasedAgg = await Lead.aggregate([
            { $project: { purchasedCount: { $size: '$purchasedBy' } } },
            { $group: { _id: null, total: { $sum: '$purchasedCount' } } }
        ]);
        const totalPurchasedLeads = leadsPurchasedAgg.length > 0 ? leadsPurchasedAgg[0].total : 0;

        // --- KPI: Leads purchased (last 30 days) - from transactions ---
        const leadsPurchased30d = await Transaction.countDocuments({
            type: 'Lead-Kauf',
            date: { $gte: thirtyDaysAgo }
        });
        const leadsPurchasedPrev30d = await Transaction.countDocuments({
            type: 'Lead-Kauf',
            date: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
        });

        // --- KPI: Revenue (total) - sum of absolute values of Lead-Kauf transactions ---
        const revenueAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf' } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        // --- KPI: Revenue (last 30 days) ---
        const revenue30dAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const revenue30d = revenue30dAgg.length > 0 ? revenue30dAgg[0].total : 0;

        const revenuePrev30dAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const revenuePrev30d = revenuePrev30dAgg.length > 0 ? revenuePrev30dAgg[0].total : 0;

        // --- Category Breakdown (last 30 days) ---
        const categoryAgg = await Lead.aggregate([
            { $match: { date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: '$service', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const categoryData = categoryAgg.map((item: any) => ({
            name: item._id || 'Sonstige',
            count: item.count
        }));

        // --- Revenue per Month (last 6 months) ---
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const monthlyRevenueAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    revenue: { $sum: { $abs: '$amount' } }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Build monthly revenue with proper month names
        const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        const revenueByMonth: { month: string; revenue: number }[] = [];

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const year = d.getFullYear();
            const month = d.getMonth() + 1; // 1-indexed

            const found = monthlyRevenueAgg.find(
                (item: any) => item._id.year === year && item._id.month === month
            );

            revenueByMonth.push({
                month: monthNames[month - 1],
                revenue: found ? found.revenue : 0
            });
        }

        // --- Percentage changes ---
        const revenueChange = revenuePrev30d > 0
            ? ((revenue30d - revenuePrev30d) / revenuePrev30d * 100)
            : (revenue30d > 0 ? 100 : 0);

        const leadsChange = leadsPurchasedPrev30d > 0
            ? ((leadsPurchased30d - leadsPurchasedPrev30d) / leadsPurchasedPrev30d * 100)
            : (leadsPurchased30d > 0 ? 100 : 0);

        const partnersChange = newPartnersPrev30d > 0
            ? newPartners30d - newPartnersPrev30d
            : newPartners30d;

        // --- Response ---
        res.json({
            kpi: {
                totalRevenue,
                totalPurchasedLeads,
                totalPartners,
                revenue30d,
                revenueChange: parseFloat(revenueChange.toFixed(1)),
                leadsPurchased30d,
                leadsChange: parseFloat(leadsChange.toFixed(1)),
                newPartners30d,
                partnersChange
            },
            categoryData,
            revenueByMonth
        });

    } catch (error: any) {
        console.error('Stats error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PARTNERS - GET /api/admin/partners
// ========================================================
export const getAdminPartners = async (req: Request, res: Response) => {
    try {
        const providers = await Provider.find().sort({ createdAt: -1 }).lean();

        const partners = providers.map((p: any, index: number) => ({
            id: p._id,
            companyName: p.companyName || p.name || 'Unbekannt',
            contactPerson: {
                anrede: p.anrede || 'Herr',
                name: p.name || p.contactName || 'Unbekannt',
                position: p.position || 'Inhaber'
            },
            email: p.email || '',
            phone: p.phone || '',
            mobile: p.mobile || '',
            services: p.services || [],
            location: p.address || p.location || '',
            kanton: p.kanton || '',
            status: p.status || 'Aktiv',
            registrationDate: p.createdAt
                ? new Date(p.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' })
                : 'Unbekannt',
            uid: p.uid || '',
            website: p.website || '',
            employees: p.employees || '',
            insuranceProvider: p.insuranceProvider || '',
            insuranceDocuments: p.insuranceDocuments || [],
            balance: p.balance || 0,
        }));

        res.json(partners);
    } catch (error: any) {
        console.error('Partners error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PARTNER DELETE - DELETE /api/admin/partners/:id
// ========================================================
export const deleteAdminPartner = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Provider.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Partner nicht gefunden' });
        }
        res.json({ message: 'Partner erfolgreich gelöscht' });
    } catch (error: any) {
        console.error('Delete partner error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PARTNER STATUS UPDATE - PUT /api/admin/partners/:id/status
// ========================================================
export const updatePartnerStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await Provider.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Partner nicht gefunden' });
        }
        res.json({ message: 'Status aktualisiert', status: (updated as any).status });
    } catch (error: any) {
        console.error('Update partner status error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN REQUESTS (Leads) - GET /api/admin/requests
// ========================================================
export const getAdminRequests = async (req: Request, res: Response) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }).lean();

        const requests = leads.map((l: any) => ({
            id: l._id,
            title: l.title || `${l.service || 'Anfrage'}`,
            location: l.location || l.plz || '',
            date: l.createdAt
                ? new Date(l.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' })
                : 'Unbekannt',
            rawDate: l.createdAt,
            purchaseCount: l.purchasedBy ? l.purchasedBy.length : 0,
            maxPurchases: l.maxPurchases || 5,
            status: l.status || 'Aktiv',
            service: l.service || 'Unbekannt',
            kanton: l.kanton || '',
            customer: {
                name: l.customerName || l.customer?.name || 'Unbekannt',
                email: l.customerEmail || l.customer?.email || '',
                phone: l.customerPhone || l.customer?.phone || '',
            },
            description: l.description || '',
            price: l.price || 0,
            details: l.details || [],
        }));

        res.json(requests);
    } catch (error: any) {
        console.error('Requests error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN REQUEST DELETE - DELETE /api/admin/requests/:id
// ========================================================
export const deleteAdminRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Lead.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Anfrage nicht gefunden' });
        }
        res.json({ message: 'Anfrage erfolgreich gelöscht' });
    } catch (error: any) {
        console.error('Delete request error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN USERS (aggregated from leads) - GET /api/admin/users
// ========================================================
export const getAdminUsers = async (req: Request, res: Response) => {
    try {
        // Aggregate unique customers from leads
        const leads = await Lead.find().lean();

        const userMap = new Map<string, any>();
        leads.forEach((l: any) => {
            const email = l.customerEmail || l.customer?.email || '';
            if (!email) return;

            if (userMap.has(email)) {
                const existing = userMap.get(email);
                existing.requestCount += 1;
                existing.requests.push({
                    id: l._id,
                    title: l.title || l.service || 'Anfrage'
                });
            } else {
                userMap.set(email, {
                    id: l._id, // Use first lead's ID as user ID
                    name: l.customerName || l.customer?.name || 'Unbekannt',
                    email: email,
                    phone: l.customerPhone || l.customer?.phone || '',
                    location: l.location || l.plz || '',
                    requestCount: 1,
                    registeredSince: l.createdAt ? new Date(l.createdAt).toISOString().split('T')[0] : '',
                    status: 'Aktiv' as const,
                    requests: [{
                        id: l._id,
                        title: l.title || l.service || 'Anfrage'
                    }]
                });
            }
        });

        const users = Array.from(userMap.values());
        res.json(users);
    } catch (error: any) {
        console.error('Users error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN FINANCE - GET /api/admin/finance
// ========================================================
export const getAdminFinance = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        // Transactions list
        const transactions = await Transaction.find()
            .sort({ date: -1 })
            .populate('providerId', 'name companyName')
            .lean();

        const formattedTransactions = transactions.map((t: any, i: number) => ({
            id: t._id?.toString()?.substring(0, 8)?.toUpperCase() || `TRX-${i + 1}`,
            date: t.date ? new Date(t.date).toISOString().split('T')[0] : '',
            partner: t.providerId?.companyName || t.providerId?.name || 'Unbekannt',
            description: t.description || '',
            type: t.type || 'Lead-Kauf',
            amount: t.amount || 0,
            status: t.status || 'Bezahlt',
        }));

        // KPI: Total Revenue
        const revenueAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf' } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        // KPI: Revenue last 30 days
        const revenue30dAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const revenue30d = revenue30dAgg.length > 0 ? revenue30dAgg[0].total : 0;

        const revenuePrev30dAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } } },
            { $group: { _id: null, total: { $sum: { $abs: '$amount' } } } }
        ]);
        const revenuePrev30d = revenuePrev30dAgg.length > 0 ? revenuePrev30dAgg[0].total : 0;

        // KPI: Sold Leads last 30 days
        const soldLeads30d = await Transaction.countDocuments({
            type: 'Lead-Kauf',
            date: { $gte: thirtyDaysAgo }
        });

        const revenueChange = revenuePrev30d > 0
            ? ((revenue30d - revenuePrev30d) / revenuePrev30d * 100)
            : (revenue30d > 0 ? 100 : 0);

        // Revenue by Category (30d)
        const revByCatAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: '$description', revenue: { $sum: { $abs: '$amount' } } } },
            { $sort: { revenue: -1 } }
        ]);
        const revenueByCategoryData = revByCatAgg.map((item: any) => ({
            category: item._id || 'Sonstige',
            revenue: item.revenue
        }));

        // Top Partners (30d)
        const topPartnersAgg = await Transaction.aggregate([
            { $match: { type: 'Lead-Kauf', date: { $gte: thirtyDaysAgo } } },
            { $group: { _id: '$providerId', totalSpent: { $sum: { $abs: '$amount' } } } },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'providers', localField: '_id', foreignField: '_id', as: 'provider' } },
            { $unwind: { path: '$provider', preserveNullAndEmptyArrays: true } }
        ]);
        const topPartnersData = topPartnersAgg.map((item: any, i: number) => ({
            rank: i + 1,
            name: item.provider?.companyName || item.provider?.name || 'Unbekannt',
            amount: item.totalSpent
        }));

        res.json({
            kpi: [
                { label: 'Gesamtumsatz', value: `CHF ${totalRevenue.toLocaleString('de-CH')}` },
                {
                    label: 'Umsatz (30T)',
                    value: `CHF ${revenue30d.toLocaleString('de-CH')}`,
                    change: revenueChange !== 0 ? `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(1)}%` : undefined,
                    changeType: revenueChange >= 0 ? 'increase' : 'decrease'
                },
                { label: 'Verkaufte Leads (30T)', value: `${soldLeads30d}` },
            ],
            transactions: formattedTransactions,
            revenueByCategoryData,
            topPartnersData
        });
    } catch (error: any) {
        console.error('Finance error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PROFILE - GET /api/admin/profile
// ========================================================
export const getAdminProfile = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findOne().lean();
        if (!admin) {
            return res.status(404).json({ message: 'Admin nicht gefunden' });
        }

        res.json({
            person: {
                anrede: 'Herr',
                firstName: (admin as any).firstName || 'Admin',
                lastName: (admin as any).lastName || 'User',
                email: admin.email || 'admin@fertigo.ch',
                phone: (admin as any).phone || '',
                position: admin.role || 'Systemadministrator',
            }
        });
    } catch (error: any) {
        console.error('Profile error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PROFILE UPDATE - PUT /api/admin/profile
// ========================================================
export const updateAdminProfile = async (req: Request, res: Response) => {
    try {
        const { anrede, firstName, lastName, email, phone, position } = req.body;
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'Admin nicht gefunden' });
        }

        if (email) admin.email = email;
        (admin as any).firstName = firstName || (admin as any).firstName;
        (admin as any).lastName = lastName || (admin as any).lastName;
        (admin as any).phone = phone || (admin as any).phone;
        if (position) admin.role = position;

        await admin.save();

        res.json({ message: 'Profil erfolgreich aktualisiert' });
    } catch (error: any) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// ========================================================
// ADMIN PASSWORD CHANGE - PUT /api/admin/password
// ========================================================
export const updateAdminPassword = async (req: Request, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'Admin nicht gefunden' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Aktuelles Passwort ist falsch' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();

        res.json({ message: 'Passwort erfolgreich geändert' });
    } catch (error: any) {
        console.error('Password change error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Create a new lead (Admin)
// @route   POST /api/admin/leads
// @access  Private (Admin)
export const createAdminLead = async (req: Request, res: Response) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
