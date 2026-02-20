import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Provider from './models/Provider';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fertigo';

async function listProviders() {
    try {
        await mongoose.connect(MONGO_URI);
        const providers = await Provider.find({}, 'email name balance');
        console.log('Providers:', JSON.stringify(providers, null, 2));
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

listProviders();
