import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  title: string;
  service: string;
  customerName: string;
  location: string;
  date: Date;
  status: string;
  price: number;
  budget: string;
  qualityScore: number;
  description: string;
  details: { label: string; value: string }[];
  customerInfo: {
    name: string;
    address: string;
    email: string;
    phone?: string;
    mobile?: string;
  };
  purchasedBy: string[]; // Array of Partner IDs
}

const LeadSchema: Schema = new Schema({
  title: { type: String, required: true },
  service: { type: String, required: true },
  customerName: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Neu', 'Kontaktiert', 'Angebot gesendet', 'In Verhandlung', 'Gewonnen', 'Verloren / Abgelehnt'],
    default: 'Neu'
  },
  price: { type: Number, required: true },
  budget: { type: String },
  qualityScore: { type: Number, default: 50 },
  description: { type: String },
  details: [{
    label: String,
    value: String
  }],
  customerInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    mobile: String
  },
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }]
});

export default mongoose.model<ILead>('Lead', LeadSchema);