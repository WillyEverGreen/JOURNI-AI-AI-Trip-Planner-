# 🚀 Vercel Deployment Checklist

Use this checklist to ensure your app is ready for Vercel deployment.

## ✅ Pre-Deployment Checklist

### 1. Code & Repository
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] No console errors in development
- [ ] App builds successfully (`npm run build`)
- [ ] Linting passes (`npm run lint`)

### 2. API Keys Ready
- [ ] Google Gemini API key
- [ ] Google Maps API key (client-side)
- [ ] Google Maps API key (server-side)
- [ ] Auth0 domain and client ID
- [ ] Firebase configuration (all 6 variables)

### 3. API Key Configurations
- [ ] Google Maps API has proper restrictions set
  - HTTP referrer restrictions for client key
  - No restrictions (or IP) for server key
- [ ] Google Maps API has required APIs enabled:
  - Places API
  - Maps JavaScript API
  - Geocoding API

### 4. Auth0 Configuration
- [ ] Auth0 application created
- [ ] Application type: Single Page Application
- [ ] Allowed Callback URLs ready to update with Vercel URL
- [ ] Allowed Logout URLs ready to update with Vercel URL
- [ ] Allowed Web Origins ready to update with Vercel URL

### 5. Firebase Configuration
- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Authentication enabled
- [ ] Security rules configured (or ready to configure)

---

## 🌐 Vercel Deployment Steps

### Step 1: Import to Vercel
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository
- [ ] Click "Import"

### Step 2: Configure Build Settings
Vercel should auto-detect these (verify):
- [ ] Framework Preset: `Vite`
- [ ] Build Command: `vite build` (or auto)
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install` (or auto)

### Step 3: Add Environment Variables
In Vercel → Settings → Environment Variables, add:

- [ ] `VITE_GEMINI_API_KEY`
- [ ] `VITE_GOOGLE_MAPS_API_KEY`
- [ ] `GOOGLE_MAPS_API_KEY` (server-side)
- [ ] `VITE_AUTH0_DOMAIN`
- [ ] `VITE_AUTH0_CLIENT_ID`
- [ ] `VITE_AUTH0_REDIRECT_URI` (use your Vercel URL)
- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`

**Select all environments:** Production, Preview, Development

### Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Note your Vercel URL (e.g., `your-app.vercel.app`)

---

## 🔧 Post-Deployment Configuration

### Update Auth0
- [ ] Go to [Auth0 Dashboard](https://manage.auth0.com)
- [ ] Navigate to Applications → Your App
- [ ] Update **Allowed Callback URLs**:
  ```
  https://your-app.vercel.app/create-trip
  ```
- [ ] Update **Allowed Logout URLs**:
  ```
  https://your-app.vercel.app
  ```
- [ ] Update **Allowed Web Origins**:
  ```
  https://your-app.vercel.app
  ```
- [ ] Save Changes

### Update Firebase
- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Select your project
- [ ] Go to Authentication → Settings → Authorized Domains
- [ ] Add your Vercel domain: `your-app.vercel.app`
- [ ] Save

### Update Environment Variable
- [ ] Go back to Vercel
- [ ] Settings → Environment Variables
- [ ] Update `VITE_AUTH0_REDIRECT_URI` to:
  ```
  https://your-app.vercel.app/create-trip
  ```
- [ ] Redeploy if you changed any variables

---

## ✨ Testing Deployment

### Basic Tests
- [ ] Visit your Vercel URL
- [ ] Homepage loads correctly
- [ ] Images and styles load
- [ ] Navigation works

### Authentication Test
- [ ] Click "Get Started" or "Sign In"
- [ ] Auth0 login page appears
- [ ] Can sign up/login successfully
- [ ] Redirected back to app after login
- [ ] User profile shows correctly

### Trip Creation Test
- [ ] Navigate to "Create Trip"
- [ ] Location search works
- [ ] Can select all options (days, budget, travelers)
- [ ] Click "Generate Trip"
- [ ] Trip generates successfully
- [ ] Trip displays with images
- [ ] Hotels show with prices in ₹
- [ ] Can click hotels/places (opens Google Maps)

### Trip Management Test
- [ ] Navigate to "My Trips"
- [ ] Created trips appear
- [ ] Can click to view trip details
- [ ] Images load properly

### API Function Test
Check browser DevTools → Network tab:
- [ ] Requests to `/api/place` succeed (200 status)
- [ ] Requests to `/api/photo` succeed (200 status)
- [ ] No CORS errors
- [ ] Images load from API

---

## 🐛 Troubleshooting

### Build Fails
- [ ] Check deployment logs in Vercel
- [ ] Verify all dependencies in `package.json`
- [ ] Test `npm run build` locally
- [ ] Check for ESLint errors

### API Not Working
- [ ] Verify `GOOGLE_MAPS_API_KEY` is set
- [ ] Check serverless function logs in Vercel
- [ ] Test API directly: `https://your-app.vercel.app/api/place?text=Paris`
- [ ] Verify API key has proper permissions

### Auth0 Issues
- [ ] Verify callback URLs match exactly
- [ ] Check Auth0 application logs
- [ ] Verify all Auth0 env vars are set
- [ ] Try clearing browser cookies/cache

### Firebase Issues
- [ ] Verify domain is authorized in Firebase
- [ ] Check Firebase security rules
- [ ] Verify all Firebase config vars are set
- [ ] Check browser console for errors

### Images Not Loading
- [ ] Check `/api/photo` endpoint works
- [ ] Verify Google Maps API key permissions
- [ ] Check browser console for errors
- [ ] Test photo API directly

---

## 🎉 Deployment Complete!

Once all items are checked:

✅ Your app is live on Vercel!
✅ Automatic deployments are configured
✅ HTTPS is enabled
✅ CDN is optimized

### Next Steps:
- [ ] Share your app URL
- [ ] Add custom domain (optional)
- [ ] Set up monitoring/analytics
- [ ] Create documentation
- [ ] Get feedback from users

---

## 📚 Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Issues](https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-/issues)

---

**Need Help?** Open an issue on GitHub or check the deployment logs in Vercel Dashboard.
