import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

interface AdminRequest extends Request {
    admin?: any;
}

/**
 * Middleware: Schützt Admin-Routen.
 * Prüft den JWT-Token und stellt sicher, dass der Benutzer ein Admin ist.
 */
export const protectAdmin = async (req: AdminRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Nicht autorisiert – kein Token' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

        // Sicherstellen, dass die Rolle 'admin' ist
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Zugriff verweigert – keine Admin-Berechtigung' });
        }

        const admin = await Admin.findById(decoded.id).select('-password');
        if (!admin) {
            return res.status(401).json({ message: 'Admin nicht gefunden' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token ungültig oder abgelaufen' });
    }
};
