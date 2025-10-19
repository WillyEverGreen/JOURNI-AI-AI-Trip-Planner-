# 🚀 Vercel Deployment Guide for JOURNI AI

This guide will help you deploy JOURNI AI Trip Planner to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works)
- A [GitHub account](https://github.com) with this repository
- All required API keys ready (see main README.md)

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

Make sure your latest code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository: `WillyEverGreen/JOURNI-AI-AI-Trip-Planner-`
4. Click **"Import"**

### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

#### Required Variables:

```plaintext
# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Maps (Client-side)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_client_key_here

# Google Maps (Server-side for API functions)
GOOGLE_MAPS_API_KEY=your_google_maps_server_key_here

# Auth0
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_REDIRECT_URI=https://your-app.vercel.app/create-trip

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**Important Notes:**
- Replace `https://your-app.vercel.app` with your actual Vercel deployment URL
- You can find your Vercel URL in the deployment settings
- All `VITE_*` variables are exposed to the client, so use client-safe keys only
- `GOOGLE_MAPS_API_KEY` (without VITE_ prefix) is server-side only

### 4. Configure Auth0 Callback URL

1. Go to your [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** → Your Application
3. Add your Vercel URL to:
   - **Allowed Callback URLs**: `https://your-app.vercel.app/create-trip`
   - **Allowed Logout URLs**: `https://your-app.vercel.app`
   - **Allowed Web Origins**: `https://your-app.vercel.app`
4. Save changes

### 5. Deploy

1. In Vercel, click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Once deployed, click **"Visit"** to see your live app!

## Project Structure for Vercel

```
AI-Trip-Planner/
├── api/                    # Vercel Serverless Functions
│   ├── place.js           # Google Maps place search endpoint
│   └── photo.js           # Google Maps photo proxy endpoint
├── dist/                   # Built files (generated)
├── src/                    # React source code
├── vercel.json            # Vercel configuration
└── package.json           # Includes vercel-build script
```

## How It Works

### Serverless Functions

Vercel automatically deploys files in the `/api` directory as serverless functions:

- **`/api/place`** - Searches for places using Google Maps API
- **`/api/photo`** - Proxies Google Maps photo requests

These functions run on Vercel's edge network and protect your server-side API keys.

### Static Site

The React app is built using Vite and deployed as static files:

1. `npm install` - Install dependencies
2. `vite build` - Build production bundle
3. Deploy to Vercel CDN

## Environment Variables in Vercel

### Setting Variables

**Via Vercel Dashboard:**
1. Go to your project
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable (Name and Value)
4. Select environments (Production, Preview, Development)
5. Click **"Save"**

**Via Vercel CLI:**
```bash
vercel env add VITE_GEMINI_API_KEY
# Paste your key when prompted
```

### Variable Scopes

- **Production** - Live site
- **Preview** - Pull request previews
- **Development** - Local development with `vercel dev`

## Custom Domain (Optional)

1. In Vercel project settings, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your custom domain (e.g., `journi-ai.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Automatic Deployments

Vercel automatically deploys:

- **Main branch** → Production
- **Pull requests** → Preview deployments
- **Other branches** → Preview deployments (optional)

Configure in **Settings** → **Git**

## Monitoring and Analytics

### Vercel Analytics (Optional)

1. Install Vercel Analytics:
   ```bash
   npm install @vercel/analytics
   ```

2. Add to `src/main.jsx`:
   ```jsx
   import { Analytics } from '@vercel/analytics/react';
   
   // Add <Analytics /> component
   ```

3. Enable in Vercel Dashboard → **Analytics**

### Error Tracking

Check serverless function logs:
1. Go to **Deployments** → Select a deployment
2. Click **"Functions"** tab
3. View real-time logs

## Troubleshooting

### Build Fails

**Error: "Command failed: npm run vercel-build"**
- Check `package.json` has `"vercel-build": "vite build"`
- Ensure all dependencies are in `dependencies` (not just `devDependencies`)

**Error: "Module not found"**
- Run `npm install` locally to verify dependencies
- Check import paths are correct

### API Functions Not Working

**Error: "API key not configured"**
- Verify `GOOGLE_MAPS_API_KEY` is set in Vercel environment variables
- Redeploy after adding variables

**CORS Errors:**
- API functions include CORS headers
- Check browser console for specific error
- Verify API function is responding at `/api/place` and `/api/photo`

### Auth0 Issues

**Error: "Redirect URI mismatch"**
- Update Auth0 callback URLs with your Vercel domain
- Ensure `VITE_AUTH0_REDIRECT_URI` matches exactly

### Firebase Issues

**Error: "Firebase: Error (auth/unauthorized-domain)"**
- Add your Vercel domain to Firebase authorized domains
- Firebase Console → Authentication → Settings → Authorized Domains

## Performance Optimization

### Vercel Configuration

The `vercel.json` file is already optimized:
- Static asset caching
- API function routing
- Automatic HTTPS

### Build Optimization

- Vite automatically optimizes production builds
- Code splitting enabled
- Assets are minified and compressed

## Cost Considerations

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless function executions: 100 GB-Hrs
- ✅ 6,000 build minutes/month
- ✅ Automatic HTTPS
- ✅ Preview deployments

**Enough for most personal projects!**

### Monitoring Usage:
- Check **Settings** → **Usage** in Vercel Dashboard
- Set up alerts for approaching limits

## Security Best Practices

✅ **Never commit `.env.local`** - Already in `.gitignore`

✅ **Use Vercel environment variables** - Secure and encrypted

✅ **Restrict API keys** - Use HTTP referrer restrictions for client keys

✅ **Enable Firebase security rules** - Protect your database

✅ **Keep dependencies updated** - Run `npm audit` regularly

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)

## Support

If you encounter issues:

1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review deployment logs in Vercel Dashboard
3. Open an issue on [GitHub](https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-/issues)

---

**Happy Deploying! 🚀**

Your JOURNI AI Trip Planner will be live in minutes!
