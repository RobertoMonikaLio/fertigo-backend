import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fertigo';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    const existing = await Admin.findOne({ email: 'info@fertigo.ch' });
    if (existing) {
      console.log('Admin already exists, updating password...');
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash('Roberto.Lio.21', salt);
      await Admin.updateOne({ email: 'info@fertigo.ch' }, { password: hashed });
      console.log('Admin password updated');
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash('Roberto.Lio.21', salt);
      await Admin.create({
        email: 'info@fertigo.ch',
        password: hashed,
        role: 'admin',
      });
      console.log('Admin created: info@fertigo.ch');
    }

    await mongoose.disconnect();
    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
