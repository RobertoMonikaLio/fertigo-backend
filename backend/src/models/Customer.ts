import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const CustomerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
