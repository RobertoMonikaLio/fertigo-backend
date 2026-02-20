
# Fertigo Deployment Guide

This guide explains how to deploy the Fertigo Platform to a live environment (e.g., Render, Railway, or Vercel).

## 1. Prerequisites

Ensure you have the following services ready:
- A MongoDB Database (e.g., MongoDB Atlas or Railway/Render managed DB).
- A Payrexx Account (API Secret & Instance Name).
- A Hosting Provider (Render, Railway, etc.).

## 2. Environment Variables

You **MUST** set these environment variables in your hosting provider's dashboard for the **Backend Service**.

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `10000` (or `5000`) |
| `MONGO_URI` | Connection string | `mongodb+srv://user:pass@cluster.mongodb.net/fertigo` |
| `JWT_SECRET` | Secret for auth tokens | `super_secure_random_string` |
| `PAYREXX_INSTANCE` | Your Payrexx instance name | `Fertigo` |
| `PAYREXX_SECRET` | Payrexx API Secret | `your_payrexx_secret_key` |
| `FRONTEND_URL` | URL of the live frontend | `https://fertigo-frontend.onrender.com` |

For the **Frontend Service** (if deployed separately), you need:
| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_API_URL` | URL of the live backend | `https://fertigo-backend.onrender.com` |

---

## 3. Deployment Strategy

The project consists of two parts:
1. **Frontend** (React + Vite) in the root directory.
2. **Backend** (Node.js + Express) in the `backend/` directory.

### Option A: Render.com (Recommended)

**Backend Service:**
1. Create a new **Web Service**.
2. Connect your Git repository.
3. **Root Directory**: `backend`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. Add the Environment Variables listed above.

**Frontend Service:**
1. Create a new **Static Site**.
2. Connect your Git repository.
3. **Root Directory**: `.` (Root)
4. **Build Command**: `npm install && npm run build`
5. **Publish Directory**: `dist`
6. Add `VITE_API_URL` environment variable pointing to your backend URL.
7. Add a Rewrite Rule (for SPA routing):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

### Option B: Railway.app

**Backend:**
1. `railway.json` is already configured for the backend.
2. Ensure the `Root Directory` in settings is set to `backend` or use the existing config.
3. Set variables in the "Variables" tab.

**Frontend:**
1. Deploy as a Static Site.
2. Set `VITE_API_URL`.

---

## 4. Final Checklist

- [ ] Database is connected and whitelisted (if applicable).
- [ ] Payrexx API keys are correct.
- [ ] `FRONTEND_URL` in backend matches the actual frontend domain (no trailing slash).
- [ ] `VITE_API_URL` in frontend matches the actual backend domain (no trailing slash).
- [ ] Frontend SPA Fallback (Rewrite rule) is configured (essential for React Router).

## 5. Troubleshooting

- **White screen on frontend?** Check the console for errors. Likely `VITE_API_URL` is missing or CORS issues.
- **API Connection Refused?** Ensure backend is running and `PORT` variable is set correctly.
- **Payment fails?** Check `PAYREXX_INSTANCE` and `PAYREXX_SECRET`. Ensure `FRONTEND_URL` is correct for redirects.

