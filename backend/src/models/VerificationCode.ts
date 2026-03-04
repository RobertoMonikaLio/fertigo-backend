import mongoose, { Schema, Document } from 'mongoose';

export interface IVerificationCode extends Document {
    email: string;
    code: string;
    type: 'verification' | 'password_reset';
    expiresAt: Date;
}

const VerificationCodeSchema: Schema = new Schema({
    email: { type: String, required: true, lowercase: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['verification', 'password_reset'], required: true },
    expiresAt: { type: Date, required: true },
}, {
    timestamps: true
});

// Auto-delete expired codes via TTL index
VerificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IVerificationCode>('VerificationCode', VerificationCodeSchema);
