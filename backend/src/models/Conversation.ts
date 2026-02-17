import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: String, enum: ['partner', 'customer'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: '' },
    customerAvatar: { type: String, default: '' },
    projectTitle: { type: String, default: '' },
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    messages: [messageSchema],
    unread: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Conversation', conversationSchema);
