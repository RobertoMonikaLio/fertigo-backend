# 🚀 Railway.app Deployment Anleitung

## Voraussetzungen
- GitHub Repository ist bereit (✅ bereits gepusht)
- Railway.app Account
- MongoDB Atlas Database
- Payrexx Account

## 1. MongoDB Atlas Setup

*(Gleich wie Render - siehe DEPLOYMENT_RENDER.md)*

## 2. Backend Deployment (Railway)

### Railway Projekt erstellen
1. Railway Dashboard → **New Project**
2. **Deploy from GitHub repo**
3. Repository: `fertigo-backend`
4. **Add Service**

### Backend Konfiguration
Die `railway.json` ist bereits konfiguriert:
```json
{
    "build": {
        "builder": "NIXPACKS",
        "buildCommand": "cd backend && npm install && npm run build"
    },
    "deploy": {
        "startCommand": "cd backend && npm start",
        "restartPolicyType": "ON_FAILURE",
        "restartPolicyMaxRetries": 10
    }
}
```

### Environment Variables
1. **Settings** → **Variables**
2. Alle Variablen hinzufügen:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://fertigo-user:PASSWORD@fertigo-cluster.xxxxx.mongodb.net/fertigo
JWT_SECRET=your_super_secure_jwt_secret_32_chars_min
PAYREXX_INSTANCE=your_payrexx_instance
PAYREXX_SECRET=your_payrexx_secret
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://fertigo-frontend.railway.app
```

### Backend URL
Nach Deployment: `https://fertigo-backend-production.up.railway.app`

## 3. Frontend Deployment (Railway)

### Neues Frontend Service
1. **New Service** → **GitHub Repo**
2. **Repository**: `fertigo-backend`
3. **Service Name**: `fertigo-frontend`

### Frontend Konfiguration
1. **Settings** → **Build Settings**
2. **Root Directory**: `.`
3. **Build Command**: `npm install && npm run build`
4. **Publish Directory**: `dist`
5. **Runtime**: Static

### Environment Variables
```
VITE_API_URL=https://fertigo-backend-production.up.railway.app
```

### Frontend URL
Nach Deployment: `https://fertigo-frontend-production.up.railway.app`

## 4. Railway Besonderheiten

### Automatic Deploys
- Railway deployed automatisch bei GitHub Push
- Branches können separat deployed werden

### Domains
- Railway stellt automatisch `.railway.app` Domains bereit
- Custom Domains können in Settings hinzugefügt werden

### Logs
- Railway Logs sind sehr detailliert
- Real-time Logs im Dashboard verfügbar

## 5. Deployment Test

### Backend Health Check
```bash
curl https://fertigo-backend-production.up.railway.app/
```

### Frontend Test
1. Frontend URL im Browser öffnen
2. Console auf Fehler prüfen
3. API-Aufrufe im Network Tab prüfen

## 6. Payrexx Integration

*(Gleich wie Render - FRONTEND_URL anpassen)*

## 🎯 Railway URLs

Nach erfolgreichem Deployment:
- **Backend**: `https://fertigo-backend-production.up.railway.app`
- **Frontend**: `https://fertigo-frontend-production.up.railway.app`

## 🔧 Railway Troubleshooting

### Build Failed
- Railway Logs prüfen
- `package.json` Scripts korrekt?
- Dependencies installiert?

### Runtime Error
- Environment Variables korrekt?
- MongoDB Connection funktioniert?
- Port korrekt (10000)?

### Frontend nicht erreichbar
- Static Site Settings korrekt?
- `dist` Ordner vorhanden?
- `index.html` im `dist` Ordner?

## 📊 Railway vs Render

| Feature | Railway | Render |
|---------|---------|---------|
| Pricing | Usage-based | Free Tier verfügbar |
| Domains | .railway.app | .onrender.com |
| Logs | Sehr detailliert | Gut |
| Build Speed | Schnell | Mittel |
| UI | Modern | Klar |

## 🚀 Next Steps

1. MongoDB Atlas einrichten
2. Payrexx konfigurieren  
3. Railway Deployment starten
4. Tests durchführen
5. Custom Domain (optional)
