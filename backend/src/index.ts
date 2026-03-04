import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db';
import apiRoutes from './routes/api';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import paymentRoutes from './routes/paymentRoutes';
import emailRoutes from './routes/emailRoutes';
import partnerRoutes from './routes/partnerRoutes';
import customerRoutes from './routes/customerRoutes';
import uploadRoutes from './routes/uploadRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:3000',
  'https://robertosteiner.github.io',
  'https://fertigo-frontend.onrender.com',
  'https://fertigo.onrender.com',
  'https://fertigo.ch',
  'https://www.fertigo.ch',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Rate Limiting ---
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { message: 'Zu viele Anfragen. Bitte warten Sie kurz.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { message: 'Zu viele Login-Versuche. Bitte versuchen Sie es in 15 Minuten erneut.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: 'Zu viele E-Mail-Anfragen. Bitte versuchen Sie es in einer Stunde erneut.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

// Database Connection
connectDB();

// Routes with specific limiters
app.use('/api', apiRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/admin', authLimiter, adminRoutes);
app.use('/api/customer', authLimiter, customerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/email', emailLimiter, emailRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Fertigo API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});