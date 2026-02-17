import mongoose from 'mongoose';

const marketplaceListingSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    type: { type: String, enum: ['Miet-Inserat', 'Verkaufs-Inserat'], default: 'Miet-Inserat' },
    images: [{ type: String }],
    category: { type: String, default: 'Sonstiges' },
    location: { type: String, default: '' },
    price: { type: String, default: '' },
    pricePerDay: { type: Number, default: 0 },
    status: { type: String, enum: ['Entwurf', 'Aktiv', 'In Verhandlung', 'Verkauft/Vermietet', 'Inaktiv'], default: 'Aktiv' },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    contact: {
        person: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
    },
}, { timestamps: true });

export default mongoose.model('MarketplaceListing', marketplaceListingSchema);
