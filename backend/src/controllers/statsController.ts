import { Request, Response } from 'express';
import Lead from '../models/Lead';
import Provider from '../models/Provider';
import Transaction from '../models/Transaction';

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
