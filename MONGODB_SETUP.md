# 🗄️ MongoDB Atlas Setup Anleitung

## 1. Account erstellen
1. [MongoDB Atlas](https://cloud.mongodb.com/) besuchen
2. **Sign Up** → Kostenlos registrieren
3. Email verifizieren
4. Telefonnummer verifizieren (falls erforderlich)

## 2. Projekt erstellen
1. Dashboard → **New Project**
2. **Project Name**: `Fertigo`
3. **Organization**: Bestehende oder neue wählen
4. **Next** → **Create Project**

## 3. Cluster erstellen

### Shared Cluster (kostenlos)
1. **Build a Database**
2. **M0 Sandbox** (kostenlos, 512MB)
3. **Cloud Provider**: AWS
4. **Region**: Frankfurt (eu-central-1) oder näheste Region
5. **Cluster Name**: `fertigo-cluster`
6. **Create Cluster**

### Wartezeit
- Cluster-Erstellung dauert 2-5 Minuten
- Status zeigt "Creating" → "Available"

## 4. Database User erstellen
1. **Database Access** (im linken Menü)
2. **Add New Database User**
3. **Authentication Method**: Password
4. **Username**: `fertigo-user`
5. **Password**: Starkes Passwort generieren
   - Mindestens 12 Zeichen
   - Speichern Sie es sicher!
6. **Database User Privileges**: 
   - Read and write to any database
7. **Add User**

## 5. Network Access konfigurieren
1. **Network Access** (linkes Menü)
2. **Add IP Address**
3. **Allow Access From**: 
   - **0.0.0.0/0** (alle IPs - für Cloud Hosting)
   - Oder spezifische IP-Adressen
4. **Confirm**

## 6. Connection String erhalten
1. **Database** → **Connect**
2. **Drivers** Tab auswählen
3. **Connection String** kopieren:
```
mongodb+srv://fertigo-user:<password>@fertigo-cluster.xxxxx.mongodb.net/fertigo
```
4. `<password>` durch Ihr tatsächliches Passwort ersetzen

## 7. Environment Variable für Deployment

### Für Render/Railway:
```
MONGO_URI=mongodb+srv://fertigo-user:IHR_PASSWORT@fertigo-cluster.xxxxx.mongodb.net/fertigo
```

### Für lokale Entwicklung:
```
MONGO_URI=mongodb+srv://fertigo-user:IHR_PASSWORT@fertigo-cluster.xxxxx.mongodb.net/fertigo
```

## 8. Database testen

### Mit MongoDB Compass
1. [MongoDB Compass](https://www.mongodb.com/try/download/compass) download
2. Connection String einfügen
3. **Connect**
4. Collections sollten sichtbar sein

### Mit Node.js Test
```javascript
const mongoose = require('mongoose');
mongoose.connect('IHR_CONNECTION_STRING')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('Connection Error:', err));
```

## 9. Collections erstellen (optional)

Die Anwendung erstellt automatisch:
- `providers` - Partner/Provider Daten
- `leads` - Kundenanfragen
- `transactions` - Zahlungsdaten
- `jobs` - Stelleninserate
- `conversations` - Nachrichten
- `marketplacelistings` - Marktplatz-Inserate

## 10. Backup & Security

### Automatische Backups
1. **Backup** Tab im Cluster
2. **Backup Policy**: Standard ist aktiviert
3. **Retention Period**: 7 Tage (kostenlos)

### Security Best Practices
- Starkes Passwort verwenden
- IP-Access beschränken (wenn möglich)
- Regelmässig Passwort ändern
- Monitoring aktivieren

## 11. Monitoring

### Cluster Metrics
1. **Metrics** Tab im Cluster
2. Wichtige Indikatoren:
   - **Connections**: Aktive Verbindungen
   - **Operations**: Lese/Schreib-Operationen
   - **Storage**: Speichernutzung

### Alerts
1. **Alerts** → **New Alert**
2. Benachrichtigungen für:
   - Hohe CPU-Nutzung
   - Speicherlimit erreicht
   - Connection Errors

## 🎯 Fertig!

Ihre MongoDB Atlas Database ist bereit für:
- ✅ Backend Deployment
- ✅ Production Einsatz
- ✅ Skalierung

## 🔧 Troubleshooting

### Connection Timeout
- IP Access korrekt konfiguriert?
- Firewall blockiert Port 27017?
- Connection String korrekt?

### Authentication Failed
- Username/Passwort korrekt?
- User hat richtige Berechtigungen?
- Database Name korrekt?

### Performance Issues
- Indexes erstellen für häufige Queries
- Query Optimierung prüfen
- Cluster-Grösse anpassen (falls nötig)

## 📊 Kostenübersicht (M0 Sandbox)
- **Speicher**: 512MB
- **Daten transfer**: 5GB/Monat
- **Connections**: 100 gleichzeitige
- **Kosten**: Kostenlos
