import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer';

export const protectCustomer = async (req: any, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Nicht autorisiert – kein Token' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

        if (decoded.role !== 'customer') {
            return res.status(403).json({ message: 'Kein Zugriff – kein Kunden-Token' });
        }

        const customer = await Customer.findById(decoded.id).select('-password');
        if (!customer) {
            return res.status(401).json({ message: 'Kunde nicht gefunden' });
        }

        req.customer = customer;
        next();
    } catch {
        return res.status(401).json({ message: 'Token ungültig oder abgelaufen' });
    }
};
