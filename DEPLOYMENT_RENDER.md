# 🚀 Render.com Deployment Anleitung

## Voraussetzungen
- GitHub Repository ist bereit (✅ bereits gepusht)
- Render.com Account
- MongoDB Atlas Database
- Payrexx Account

## 1. MongoDB Atlas Setup

### Database erstellen
1. [MongoDB Atlas](https://cloud.mongodb.com/) → Login
2. **New Project** → "Fertigo"
3. **Build a Database** → M0 Sandbox (kostenlos)
4. **Cluster Name**: "fertigo-cluster"
5. **Cloud Provider**: AWS, Region: Frankfurt (eu-central-1)
6. **Create Cluster**

### User erstellen
1. **Database Access** → **Add New Database User**
2. **Username**: `fertigo-user`
3. **Password**: Sicheres Passwort generieren
4. **Permissions**: Read and write to any database

### Network Access
1. **Network Access** → **Add IP Address**
2. **Allow Access From**: 0.0.0.0/0 (alle IPs für Render)

### Connection String
1. **Database** → **Connect** → **Drivers**
2. Connection String kopieren:
```
mongodb+srv://fertigo-user:PASSWORD@fertigo-cluster.xxxxx.mongodb.net/fertigo
```

## 2. Backend Service (Render)

### Service erstellen
1. Render Dashboard → **New** → **Web Service**
2. **Connect Repository**: GitHub → fertigo-backend
3. **Name**: `fertigo-backend`
4. **Root Directory**: `backend`
5. **Runtime**: Node
6. **Build Command**: `npm install && npm run build`
7. **Start Command**: `npm start`

### Environment Variables
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://fertigo-user:PASSWORD@fertigo-cluster.xxxxx.mongodb.net/fertigo
JWT_SECRET=your_super_secure_jwt_secret_32_chars_min
PAYREXX_INSTANCE=your_payrexx_instance
PAYREXX_SECRET=your_payrexx_secret
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://fertigo-frontend.onrender.com
```

## 3. Frontend Service (Render)

### Service erstellen
1. **New** → **Static Site**
2. **Repository**: GitHub → fertigo-backend
3. **Name**: `fertigo-frontend`
4. **Root Directory**: `.`
5. **Build Command**: `npm install && npm run build`
6. **Publish Directory**: `dist`

### Environment Variables
```
VITE_API_URL=https://fertigo-backend.onrender.com
```

### Rewrite Rule (wichtig!)
1. **Settings** → **Custom Redirects**
2. **Add Redirect Rule**:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: Rewrite

## 4. Payrexx Setup

### Konfiguration
1. [Payrexx Dashboard](https://portal.payrexx.com/) → Login
2. **Instances** → **Create Instance**
3. **Instance Name**: `Fertigo`
4. **API Secret**: Kopieren für Environment Variables

### Webhook (optional)
1. **Settings** → **Webhooks**
2. **URL**: `https://fertigo-backend.onrender.com/api/payment/webhook`

## 5. Deployment Test

### Backend testen
1. Backend URL: `https://fertigo-backend.onrender.com`
2. Health Check: `https://fertigo-backend.onrender.com/`
3. API Test: `https://fertigo-backend.onrender.com/api/partner/dashboard`

### Frontend testen
1. Frontend URL: `https://fertigo-frontend.onrender.com`
2. Browser Console auf Fehler prüfen
3. Network Tab auf API-Aufrufe prüfen

## 6. Post-Deployment

### SSL Zertifikate
- Render stellt automatisch SSL bereit
- Beide Services sollten HTTPS verwenden

### Monitoring
- Render Dashboard für Logs prüfen
- Error Monitoring einrichten

### Backup
- MongoDB Atlas Backup aktivieren
- Regelmässige Daten-Backups prüfen

## 🎯 Fertig!

Ihre Fertigo-Webseite ist jetzt live unter:
- **Frontend**: `https://fertigo-frontend.onrender.com`
- **Backend**: `https://fertigo-backend.onrender.com`

## 🔧 Troubleshooting

### Frontend zeigt White Screen
- Browser Console prüfen
- `VITE_API_URL` korrekt gesetzt?
- CORS Fehler im Backend?

### API Connection Failed
- Backend läuft? (Logs prüfen)
- `MONGO_URI` korrekt?
- Environment Variablen alle gesetzt?

### Payment nicht working
- Payrexx Keys korrekt?
- `FRONTEND_URL` passt zur Domain?
