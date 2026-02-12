import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'default_secret_key', {
    expiresIn: '7d',
  });
};

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
    }

    res.json({
      _id: admin.id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin.id, admin.role),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify admin token
// @route   GET /api/admin/verify
// @access  Private
export const verifyAdmin = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Kein Token' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({ message: 'Admin nicht gefunden' });
    }

    res.json({ _id: admin.id, email: admin.email, role: admin.role });
  } catch {
    res.status(401).json({ message: 'Token ungültig' });
  }
};
