import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import apiRoutes from './routes/api';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import paymentRoutes from './routes/paymentRoutes';
import emailRoutes from './routes/emailRoutes';
import partnerRoutes from './routes/partnerRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://robertosteiner.github.io',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins as string[],
  credentials: true,
}));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/partner', partnerRoutes);

app.get('/', (req, res) => {
  res.send('Fertigo API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});