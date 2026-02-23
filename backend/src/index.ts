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
  'https://fertigo-frontend.onrender.com',
  'https://fertigo.onrender.com',
  'https://fertigo.ch',
  'https://www.fertigo.ch',
];

// Add FRONTEND_URL if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
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