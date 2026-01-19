import mongoose, { Schema, Document } from 'mongoose';

export interface IProvider extends Document {
  name: string;
  email: string;
  password?: string; // Added for auth
  location: string;
  services: string[];
  rating: number;
  reviewCount: number;
  balance: number;
  about: string;
  contact: {
    phone: string;
    website: string;
    address: string;
  };
  details: {
    founded: string;
    employees: string;
    uid: string;
  };
}

const ProviderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added for auth
  location: { type: String, required: true },
  services: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  balance: { type: Number, default: 0 }, // Wallet Balance
  about: String,
  contact: {
    phone: String,
    website: String,
    address: String
  },
  details: {
    founded: String,
    employees: String,
    uid: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);