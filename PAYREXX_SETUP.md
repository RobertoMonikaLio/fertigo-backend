# 💳 Payrexx Payment Integration Anleitung

## 1. Payrexx Account erstellen
1. [Payrexx](https://www.payrexx.com/) → **Sign Up**
2. **Business Account** auswählen
3. Unternehmensdaten eingeben:
   - Firmenname
   - Adresse
   - Umsatzsteuer-ID
   - Bankverbindung
4. **Verification**完成 (Identitätsprüfung)

## 2. Instance erstellen

### Neue Instance
1. Dashboard → **Instances** → **Create Instance**
2. **Instance Details**:
   - **Instance Name**: `Fertigo`
   - **Currency**: CHF (Schweizer Franken)
   - **Language**: Deutsch
   - **Domain**: Optional (Custom Domain)
3. **Create Instance**

### Instance Konfiguration
1. **Settings** → **General**
2. **Success URL**: `https://IHR_FRONTEND_URL/payment/success`
3. **Failed URL**: `https://IHR_FRONTEND_URL/payment/failed`
4. **Cancel URL**: `https://IHR_FRONTEND_URL/payment/cancel`

## 3. API Keys erhalten

### API Secret
1. **Settings** → **API**
2. **API Secret** kopieren
3. **Sicher aufbewahren!**

### Instance Name
1. Instance Name notieren: `Fertigo`
2. Wird für API-Aufrufe benötigt

## 4. Environment Variables

### Backend Configuration
```bash
PAYREXX_INSTANCE=Fertigo
PAYREXX_SECRET=your_api_secret_here
```

### Für Production
```bash
PAYREXX_INSTANCE=Fertigo
PAYREXX_SECRET=prod_secret_key_from_payrexx
```

## 5. Payment Integration

### Backend API Implementation
Die Payment-Endpunkte sind bereits implementiert:

#### Payment erstellen
```javascript
POST /api/payment/create
{
  "amount": 5000,  // in Rappen (50.00 CHF)
  "reference": "partner_premium",
  "successUrl": "https://domain.com/success",
  "failedUrl": "https://domain.com/failed"
}
```

#### Payment Status prüfen
```javascript
GET /api/payment/status/{transactionId}
```

#### Webhook Handler
```javascript
POST /api/payment/webhook
// Empfängt Payrexx Webhooks
```

## 6. Frontend Integration

### Payment Button
```jsx
const handlePayment = async () => {
  try {
    const response = await fetch(`${API_URL}/api/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 5000,
        reference: 'partner_premium',
        successUrl: `${window.location.origin}/payment/success`,
        failedUrl: `${window.location.origin}/payment/failed`
      })
    });
    
    const { paymentUrl } = await response.json();
    window.location.href = paymentUrl;
  } catch (error) {
    console.error('Payment failed:', error);
  }
};
```

## 7. Webhook Konfiguration

### Webhook URL einrichten
1. **Settings** → **Webhooks**
2. **Webhook URL**: `https://IHR_BACKEND_URL/api/payment/webhook`
3. **Events**: Alle auswählen
4. **Save**

### Webhook Security
- Payrexx sendet Signatur im Header
- Backend validiert Signatur
- Nur vertrauenswürdige Webhooks verarbeiten

## 8. Payment Flow

### 1. User klickt "Kaufen"
```
Frontend → POST /api/payment/create
Backend → Payrexx API
Payrexx → Payment URL
Frontend → Redirect zu Payrexx
```

### 2. Payment auf Payrexx
```
User bezahlt auf Payrexx Seite
Payrexx → Redirect zu Success/Failed URL
Payrexx → Webhook an Backend
```

### 3. Payment Abschluss
```
Backend → Webhook verarbeiten
Backend → User Status aktualisieren
Frontend → Success/Error anzeigen
```

## 9. Testing

### Test Mode
1. **Settings** → **Test Mode**
2. Test-Kreditkarten verwenden:
   - **Visa**: 4111111111111111
   - **Mastercard**: 5555555555554444
   - **Any expiry date**: Future date
   - **Any CVC**: 3 digits

### Test Payments
1. Test-Payments durchführen
2. Webhook-Empfang prüfen
3. Payment-Flow validieren

## 10. Production Go-Live

### Live Mode aktivieren
1. **Settings** → **Live Mode**
2. Alle Tests abgeschlossen
3. Compliance geprüft

### Production URLs
```bash
# Frontend
FRONTEND_URL=https://fertigo-frontend.onrender.com

# Backend
PAYREXX_INSTANCE=Fertigo
PAYREXX_SECRET=production_secret
```

## 11. Monitoring & Logging

### Payment Logs
```javascript
// Backend logging
console.log('Payment created:', { amount, reference, transactionId });
console.log('Payment status:', { status, transactionId });
```

### Error Handling
```javascript
try {
  const payment = await createPayment(data);
  return payment;
} catch (error) {
  console.error('Payment creation failed:', error);
  throw new Error('Payment service unavailable');
}
```

## 🎯 Fertig!

Ihre Payrexx Integration ist bereit für:
- ✅ Test-Payments
- ✅ Production-Payments
- ✅ Webhook-Verarbeitung
- ✅ Payment-Status-Tracking

## 🔧 Troubleshooting

### Payment Failed
- API Secret korrekt?
- Instance Name korrekt?
- URLs erreichbar?

### Webhook nicht empfangen
- Webhook URL korrekt?
- Firewall blockiert?
- SSL-Zertifikat gültig?

### Currency Issues
- CHF als Währung konfiguriert?
- Betrag in Rappen (nicht Franken)?

## 📊 Payrexx Gebühren

### Transaktionsgebühren
- **Kreditkarte**: 2.4% + 0.30 CHF
- **Twint**: 1.4% + 0.20 CHF
- **PostFinance**: 1.8% + 0.25 CHF

### Monatliche Gebühren
- **Basic Instance**: 0 CHF/Monat
- **Pro Instance**: 29 CHF/Monat
- **Enterprise**: Individuell

## 🔒 Security Best Practices

1. **API Secret** niemals im Frontend speichern
2. **HTTPS** für alle URLs verwenden
3. **Webhook Signatur** validieren
4. **Payment Limits** implementieren
5. **Logging** für Audits aktivieren
