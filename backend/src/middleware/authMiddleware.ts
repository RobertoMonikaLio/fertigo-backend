import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Provider from '../models/Provider';

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    (req as any).headers.authorization &&
    (req as any).headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = (req as any).headers.authorization.split(' ')[1];

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

      // Get user from the token (exclude password)
      req.user = await Provider.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
  }
};