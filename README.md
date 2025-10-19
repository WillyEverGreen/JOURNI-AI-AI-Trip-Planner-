# 🌍 JOURNI AI - AI-Powered Trip Planner

> **Your Personal AI Travel Companion** - Plan the perfect trip in seconds with intelligent itinerary generation powered by Google's Gemini AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

🤖 **AI-Powered Itinerary Generation** - Get personalized day-by-day trip plans with activities, restaurants, and hotel recommendations powered by Google Gemini AI

🗺️ **Smart Location Search** - Real-time location search with Google Places API integration

🏨 **Hotel Recommendations** - Curated hotel options with ratings, prices in Indian Rupees (₹), and direct Google Maps integration

🍽️ **Restaurant Suggestions** - Discover the best local cuisines with ratings and location details

🎯 **Customizable Trip Planning** - Choose from solo, couple, family, friends, or custom group sizes

💰 **Budget Options** - Select from budget-friendly, moderate, or luxury travel experiences

🔐 **Secure Authentication** - Auth0 integration for secure user login and trip management

📱 **Responsive Design** - Beautiful, mobile-first UI built with Tailwind CSS and Shadcn/ui components

💾 **Save Your Trips** - Store and manage multiple trip plans with Firebase Firestore

⚡ **Lightning Fast** - Built with Vite for optimal development and production performance

---

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library
- **Vite 7.1.6** - Next-generation frontend tooling
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Services

- **Express.js** - Node.js web framework for API proxy
- **Firebase 12.3.0** - Firestore database for trip storage
- **Google Gemini AI** - AI-powered trip generation
- **Google Maps API** - Location search and place details
- **Auth0** - Authentication and user management

### Development Tools

- **ESLint** - Code linting and quality
- **Concurrently** - Run multiple scripts simultaneously
- **React Hot Toast** - Beautiful notifications

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Required API Keys

You'll need to obtain the following API keys:

1. **Google Gemini API Key** - [Get it here](https://ai.google.dev/)
2. **Google Maps API Key** - [Get it here](https://developers.google.com/maps)
3. **Auth0 Credentials** - [Get it here](https://auth0.com/)
4. **Firebase Config** - [Get it here](https://firebase.google.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-.git
   cd JOURNI-AI-AI-Trip-Planner-
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   copy .env.local.example .env.local
   ```

   Open `.env.local` and fill in your API keys:

   ```env
   # Google Gemini AI
   VITE_GEMINI_API_KEY=your_gemini_api_key_here

   # Google Maps (Client-side)
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_client_key_here

   # Google Maps (Server-side for proxy)
   GOOGLE_MAPS_API_KEY=your_google_maps_server_key_here

   # Auth0
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_REDIRECT_URI=http://localhost:5173/create-trip

   # Firebase
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

   **⚠️ Important:** Never commit your `.env.local` file to version control!

4. **Start the development server**

   ```bash
   npm run dev
   ```

   This will automatically start:

   - Express API proxy server (for Google Maps API)
   - Vite development server

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📖 Usage

### Creating Your First Trip

1. **Navigate to "Create Trip"** from the homepage
2. **Enter your destination** using the smart location search
3. **Select trip duration** (number of days)
4. **Choose your budget** - Budget-friendly, Moderate, or Luxury
5. **Select travelers** - Solo, Couple, Family, Friends, or Custom
6. **Click "Generate Trip"** and let AI create your perfect itinerary!
7. **View your trip** with detailed day-by-day plans, hotel options, and restaurant recommendations

### Managing Your Trips

- **View all trips** - Access your saved trips from the "My Trips" section
- **Trip details** - Click on any trip to see the complete itinerary
- **Google Maps integration** - Click on hotels or places to view them on Google Maps
- **Responsive design** - Access your trips on any device

---

## 🏗️ Project Structure

```
AI-Trip-Planner/
├── public/
│   ├── fonts/              # Custom fonts
│   ├── hero-art.svg        # Hero section artwork
│   └── logo.svg            # App logo
├── src/
│   ├── assets/             # Static assets
│   ├── components/
│   │   ├── custom/         # Custom components
│   │   │   ├── CTA.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── header.jsx
│   │   │   ├── hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── LocationSearch.jsx
│   │   └── ui/             # Shadcn/ui components
│   │       └── button.jsx
│   ├── constants/
│   │   ├── options.jsx     # Traveler and budget options
│   │   └── prompts.js      # AI prompt templates
│   ├── create-trip/
│   │   ├── index.jsx       # Trip creation page
│   │   └── lib/
│   │       └── utils.js
│   ├── my-trips/
│   │   └── MyTrips.jsx     # User's trip list
│   ├── service/
│   │   ├── AIModel.jsx     # Gemini AI integration
│   │   ├── firebase.js     # Firebase config
│   │   └── GlobalApi.jsx   # API utilities
│   ├── view-trip/
│   │   └── [tripid]/
│   │       ├── index.jsx
│   │       └── components/
│   │           ├── Footer.jsx
│   │           ├── Hotels.jsx
│   │           ├── infoSection.jsx
│   │           ├── PlaceCard.jsx
│   │           ├── PlaceImage.jsx
│   │           └── PlacesToVisit.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local.example      # Environment variables template
├── .gitignore
├── components.json         # Shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── server.js               # Express API proxy
└── vite.config.js
```

---

## 🔧 Available Scripts

| Command             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start both API server and Vite dev server concurrently |
| `npm run serve-api` | Start only the Express API proxy server                |
| `npm run build`     | Build the app for production                           |
| `npm run preview`   | Preview the production build locally                   |
| `npm run lint`      | Run ESLint to check code quality                       |

---

## 🌐 API Integration

### Google Gemini AI

The app uses Google's Gemini 2.0 Flash model to generate intelligent, context-aware trip itineraries based on user preferences.

### Google Maps API

- **Places API** - Location search and autocomplete
- **Photos API** - Fetch place images
- **Proxy Server** - Express.js proxy to securely handle server-side API calls

### Firebase Firestore

- Store user trip data
- Real-time data synchronization
- Secure user-specific trip retrieval

### Auth0

- Secure user authentication
- Social login support
- Protected routes and trip management

---

## 🎨 Customization

### Modifying AI Prompts

Edit `src/constants/prompts.js` to customize how the AI generates trip plans.

### Changing Budget/Traveler Options

Modify `src/constants/options.jsx` to add or edit travel preferences.

### Styling

- Global styles: `src/index.css`
- Tailwind config: Uses Tailwind CSS v4 with Vite plugin
- Component styles: Utility classes throughout components

---

## 🔒 Security Best Practices

- ✅ Environment variables are excluded from version control
- ✅ API keys are never exposed to the client (server-side proxy for Google Maps)
- ✅ Auth0 handles secure authentication
- ✅ Firebase security rules should be configured for production

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Platforms

This app can be deployed to:

**Note:** Make sure to set up environment variables in your deployment platform and deploy both the frontend and the Express proxy server.

- ✅ CORS is properly configured in the Express server

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-)

**Quick Deploy:**

1. Click the button above
2. Connect your GitHub account
3. Add environment variables (see below)
4. Deploy!

This app is **optimized for Vercel** with:

- ✅ Serverless API functions in `/api` directory
- ✅ Automatic static site deployment
- ✅ Zero configuration needed
- ✅ Free tier available

### Environment Variables for Vercel

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_client_key
GOOGLE_MAPS_API_KEY=your_google_maps_server_key
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_REDIRECT_URI=https://your-app.vercel.app/create-trip
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**📘 Full Deployment Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

### Other Platforms

This app can also be deployed to:

- **Netlify** - Requires Netlify Functions setup
- **Firebase Hosting** - Requires Cloud Functions for API
- **AWS Amplify** - Requires Lambda functions for API
- **Render** - Requires separate API service

**Note:** Vercel is recommended as it requires zero configuration and includes serverless functions out of the box.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [Google Maps Platform](https://developers.google.com/maps) for location services
- [Auth0](https://auth0.com/) for authentication
- [Firebase](https://firebase.google.com/) for database services
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast development

---

## 📧 Contact

**Willy EverGreen** - [@WillyEverGreen](https://github.com/WillyEverGreen)

Project Link: [https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-](https://github.com/WillyEverGreen/JOURNI-AI-AI-Trip-Planner-)

---

## 🐛 Known Issues & Troubleshooting

### Issue: API proxy not working

**Solution:** Ensure `server.js` is running and `GOOGLE_MAPS_API_KEY` is set in `.env.local`

### Issue: Gemini AI not generating trips

**Solution:**

- Verify `VITE_GEMINI_API_KEY` is correct
- Check your Gemini API quota
- Ensure you're using Gemini 2.0 Flash or compatible model

### Issue: Auth0 redirect not working

**Solution:**

- Verify `VITE_AUTH0_REDIRECT_URI` matches your Auth0 application settings
- Check allowed callback URLs in Auth0 dashboard

### Issue: Firebase connection errors

**Solution:** Double-check all Firebase config variables in `.env.local`

---

<div align="center">

**Made with ❤️ by Willy EverGreen**

⭐ Star this repo if you find it helpful!

</div>
