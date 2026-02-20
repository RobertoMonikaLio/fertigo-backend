import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Provider from '../models/Provider';

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'default_secret_key', {
    expiresIn: '30d',
  });
};

// @desc    Register new provider
// @route   POST /api/auth/register
// @access  Public
export const registerProvider = async (req: Request, res: Response) => {
  const { name, email, password, location, services, firstName, lastName, position, companyPhone, companyEmail, companyAddress } = req.body;

  try {
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'Bitte alle Pflichtfelder ausfüllen' });
    }

    // Check if provider exists
    const providerExists = await Provider.findOne({ email });

    if (providerExists) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create provider
    const provider = await Provider.create({
      name,
      email,
      password: hashedPassword,
      location,
      services: services || [],
      balance: 0,
      contact: {
        phone: companyPhone || '',
        website: '',
        address: companyAddress || location,
        email: companyEmail || email
      },
      details: {
        founded: new Date().getFullYear().toString(),
        employees: '1-5',
        uid: '',
        owner: `${firstName} ${lastName}`.trim(),
        position: position || ''
      }
    });

    if (provider) {
      res.status(201).json({
        _id: provider.id,
        name: provider.name,
        email: provider.email,
        location: provider.location,
        token: generateToken(provider.id),
      });
    } else {
      res.status(400).json({ message: 'Ungültige Partnerdaten' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a provider
// @route   POST /api/auth/login
// @access  Public
export const loginProvider = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check for provider email
    const provider = await Provider.findOne({ email });

    if (provider && (await bcrypt.compare(password, provider.password!))) {
      res.json({
        _id: provider.id,
        name: provider.name,
        email: provider.email,
        balance: provider.balance,
        token: generateToken(provider.id),
      });
    } else {
      res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get provider data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response) => {
  const { _id, name, email, location, balance } = req.user;
  res.status(200).json({
    id: _id,
    name,
    email,
    location,
    balance,
  });
};