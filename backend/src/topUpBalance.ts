import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Provider from './models/Provider';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fertigo';

async function topUpBalance(email: string, amount: number) {
    try {
        await mongoose.connect(MONGO_URI);
        const provider = await Provider.findOne({ email });
        if (!provider) {
            console.error(`Provider with email ${email} not found.`);
            process.exit(1);
        }
        provider.balance += amount;
        await provider.save();
        console.log(`Successfully added CHF ${amount} to ${email}. New balance: CHF ${provider.balance}`);
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('Error topping up balance:', err);
        process.exit(1);
    }
}

const email = process.argv[2];
const amount = parseFloat(process.argv[3]);

if (!email || isNaN(amount)) {
    console.log('Usage: npx ts-node src/topUpBalance.ts <email> <amount>');
    process.exit(1);
}

topUpBalance(email, amount);
