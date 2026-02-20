# Fertigo Testing & Live Setup Guide

## 1. Local Testing of the Purchase Flow

To verify that partners can buy leads, follow these steps:

### A. Populate Leads
Make sure there are available leads in your local database:
```bash
# In the backend directory
npm run seed:leads
```

### B. Create or Identify a Partner
Log in with an existing partner account or register a new one at `http://localhost:5173/#/register`.

### C. Add Test Balance
Since new accounts start with CHF 0.00, use this new command to add balance for testing:
```bash
# In the backend directory
npm run topup <partner-email> 100
```
*Example: `npm run topup test@partner.ch 100`*

### D. Purchase a Lead
1. Go to the **Partner Dashboard** -> **Lead-Marktplatz**.
2. Click on a lead to open the **Quick View**.
3. Click **"Lead jetzt kaufen"**.
4. The lead should move to your **"Meine Leads"** section, and your balance should decrease.

---

## 2. Live Environment Setup (Render / Production)

When you are ready to go live, ensure these settings are configured in your hosting dashboard:

### Backend (Web Service on Render)
Set these environment variables:
- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: `10000` (Render's default).
- `JWT_SECRET`: A long random string.
- `FRONTEND_URL`: `https://your-frontend-domain.com` (no trailing slash).
- `PAYREXX_INSTANCE`: Your Payrexx instance name.
- `PAYREXX_SECRET`: Your Payrexx API Key.

### Frontend (Static Site on Render)
Set this environment variable:
- `VITE_API_URL`: `https://your-backend-url.onrender.com` (no trailing slash).

### Important for Routing:
On Render (Static Site), add a **Rewrite Rule** to handle React Router correctly:
- **Source**: `/*`
- **Destination**: `/index.html`
- **Action**: `Rewrite`

---

## 3. Verifying the Deployment
After deployment, tests:
1. **Registration:** Can you create a new partner account?
2. **Quote Request:** Does a user request appear in the partner marketplace?
3. **Payment:** Does depositing money via Payrexx update the balance on the live dashboard?
