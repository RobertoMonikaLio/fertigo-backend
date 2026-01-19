import { Request, Response } from 'express';
import Provider from '../models/Provider';

export const getProviders = async (req: Request, res: Response) => {
  try {
    const providers = await Provider.find().select('-password');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getProviderById = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findById(req.params.id).select('-password');
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createProvider = async (req: Request, res: Response) => {
  try {
    // Beachten Sie: Für die Registrierung von Benutzern verwenden Sie den Endpunkt /api/auth/register, der das Passwort-Hashing übernimmt.
    // Dies ist ein generischer Admin-/Backend-Endpunkt und sollte mit Vorsicht verwendet werden, insbesondere in Bezug auf Passwörter.
    const newProvider = new Provider(req.body);
    const savedProvider = await newProvider.save();
    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(400).json({ message: 'Error creating provider' });
  }
};

export const updateProvider = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    res.json(provider);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

export const deleteProvider = async (req: Request, res: Response) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);
        
        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        
        res.json({ message: 'Provider removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateBalance = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body; // Positive amount to top up

    try {
        const provider = await Provider.findById(id);
        if(!provider) return res.status(404).json({ message: 'Provider not found'});

        provider.balance += amount;
        await provider.save();

        res.json({ success: true, balance: provider.balance });
    } catch (error) {
        res.status(500).json({ message: 'Server Error'});
    }
}
