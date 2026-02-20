# Production Deployment Checklist

## Environment Variables Setup

### Backend (Required)
Copy `backend/.env.production` and set these values:

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fertigo
JWT_SECRET=your_super_secure_random_jwt_secret_at_least_32_characters
PAYREXX_INSTANCE=your_payrexx_instance_name
PAYREXX_SECRET=your_payrexx_api_secret
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (Required)
Copy `.env.production` and set:
```bash
VITE_API_URL=https://your-backend-domain.com
```

## Pre-Deployment Tests

1. **Build Test**
   ```bash
   npm run build  # Frontend
   cd backend && npm run build  # Backend
   ```

2. **Environment Test**
   - All environment variables must be set
   - MongoDB connection must work
   - Payrexx API must be configured

## Deployment Steps

### Render.com
1. Backend Service: Root directory `backend`
2. Frontend Service: Root directory `.`
3. Set all environment variables in dashboard
4. Enable auto-deploy from main branch

### Railway.app
1. Backend: Use existing `railway.json`
2. Frontend: Deploy as static site
3. Set variables in Railway dashboard

## Post-Deployment Verification

- [ ] Frontend loads without console errors
- [ ] API endpoints respond correctly
- [ ] User registration/login works
- [ ] Partner dashboard loads
- [ ] Payment processing functions
- [ ] Email notifications work

## Security Notes

- Never commit `.env` files
- Use strong, unique secrets
- Enable HTTPS in production
- Regularly update dependencies
- Monitor error logs
