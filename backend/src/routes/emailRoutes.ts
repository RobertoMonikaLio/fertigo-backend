import express from 'express';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import Provider from '../models/Provider';

const router = express.Router();

let resend: Resend;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

// In-memory store for verification codes (key: email, value: { code, expiresAt })
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

router.post('/send-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Ungültige E-Mail-Adresse.' });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store with 10 min expiry
    verificationCodes.set(email.toLowerCase(), {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Send email via Resend
    const { error } = await getResend().emails.send({
      from: 'Fertigo <noreply@fertigo.ch>',
      to: email,
      subject: 'Ihr Verifizierungscode - Fertigo',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #1e293b; margin: 0;">Fertigo</h1>
            <p style="color: #16a34a; font-size: 12px; margin: 4px 0 0;">Clever, Günstig, Flexibel</p>
          </div>
          <h2 style="font-size: 20px; color: #1e293b; text-align: center;">Ihr Verifizierungscode</h2>
          <p style="color: #475569; text-align: center; line-height: 1.6;">
            Bitte geben Sie den folgenden Code ein, um Ihre E-Mail-Adresse zu bestätigen:
          </p>
          <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f172a;">${code}</span>
          </div>
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Dieser Code ist 10 Minuten gültig.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ message: 'E-Mail konnte nicht gesendet werden.' });
    }

    res.json({ message: 'Verifizierungscode gesendet.' });
  } catch (err: any) {
    console.error('Send verification error:', err);
    res.status(500).json({ message: 'Fehler beim Senden des Codes.' });
  }
});

router.post('/verify-code', (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'E-Mail und Code sind erforderlich.' });
    }

    const stored = verificationCodes.get(email.toLowerCase());

    if (!stored) {
      return res.status(400).json({ message: 'Kein Code für diese E-Mail gefunden.' });
    }

    if (Date.now() > stored.expiresAt) {
      verificationCodes.delete(email.toLowerCase());
      return res.status(400).json({ message: 'Der Code ist abgelaufen. Bitte fordern Sie einen neuen an.' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ message: 'Der eingegebene Code ist ungültig.' });
    }

    // Code is valid - clean up
    verificationCodes.delete(email.toLowerCase());
    res.json({ verified: true });
  } catch (err: any) {
    console.error('Verify code error:', err);
    res.status(500).json({ message: 'Fehler bei der Verifizierung.' });
  }
});

// Password Reset Routes
router.post('/send-password-reset', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Ungültige E-Mail-Adresse.' });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store with 10 min expiry
    verificationCodes.set(`reset_${email.toLowerCase()}`, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Send email via Resend
    const { error } = await getResend().emails.send({
      from: 'Fertigo <noreply@fertigo.ch>',
      to: email,
      subject: 'Passwort zurücksetzen - Fertigo',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #1e293b; margin: 0;">Fertigo</h1>
            <p style="color: #16a34a; font-size: 12px; margin: 4px 0 0;">Clever, Günstig, Flexibel</p>
          </div>
          <h2 style="font-size: 20px; color: #1e293b; text-align: center;">Passwort zurücksetzen</h2>
          <p style="color: #475569; text-align: center; line-height: 1.6;">
            Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt. Bitte verwenden Sie den folgenden Code:
          </p>
          <div style="background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f172a;">${code}</span>
          </div>
          <p style="color: #64748b; font-size: 14px; text-align: center;">
            Dieser Code ist 10 Minuten gültig.
          </p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren. Ihr Passwort bleibt unverändert.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend reset error:', error);
      return res.status(500).json({ message: 'E-Mail konnte nicht gesendet werden.' });
    }

    res.json({ message: 'Reset-Code gesendet.' });
  } catch (err: any) {
    console.error('Send reset error:', err);
    res.status(500).json({ message: 'Fehler beim Senden des Codes.' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
    }

    const stored = verificationCodes.get(`reset_${email.toLowerCase()}`);

    if (!stored) {
      return res.status(400).json({ message: 'Kein Reset-Code für diese E-Mail gefunden.' });
    }

    if (Date.now() > stored.expiresAt) {
      verificationCodes.delete(`reset_${email.toLowerCase()}`);
      return res.status(400).json({ message: 'Der Code ist abgelaufen.' });
    }

    if (stored.code !== code) {
      return res.status(400).json({ message: 'Der eingegebene Code ist ungültig.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update provider password
    const provider = await Provider.findOneAndUpdate(
      { email: email.toLowerCase() },
      { password: hashedPassword },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden.' });
    }

    // Clean up
    verificationCodes.delete(`reset_${email.toLowerCase()}`);

    res.json({ message: 'Passwort erfolgreich zurückgesetzt.' });
  } catch (err: any) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Fehler beim Zurücksetzen des Passworts.' });
  }
});

export default router;
