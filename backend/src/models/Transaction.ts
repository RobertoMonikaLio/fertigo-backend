import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  providerId: mongoose.Types.ObjectId;
  date: Date;
  description: string;
  type: 'Lead-Kauf' | 'Guthaben-Aufladung' | 'Inserat-Gebühr';
  amount: number;
  status: 'Bezahlt' | 'Ausstehend';
  referenceId?: string; // e.g. Lead ID
}

const TransactionSchema: Schema = new Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Lead-Kauf', 'Guthaben-Aufladung', 'Inserat-Gebühr'],
    required: true 
  },
  amount: { type: Number, required: true }, // Negative for purchases, Positive for top-ups
  status: { 
    type: String, 
    enum: ['Bezahlt', 'Ausstehend'],
    default: 'Bezahlt'
  },
  referenceId: { type: String }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);