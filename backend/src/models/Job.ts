import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    type: { type: String, enum: ['Vollzeit', 'Teilzeit', 'Temporär', 'Praktikum'], default: 'Vollzeit' },
    salary: { type: String, default: '' },
    status: { type: String, enum: ['Aktiv', 'Inaktiv', 'Entwurf'], default: 'Aktiv' },
    applicants: { type: Number, default: 0 },
    contact: {
        person: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
    },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
