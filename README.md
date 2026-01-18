# 🌍 JOURNI AI - AI-Powered Trip Planner

> **Your Personal AI Travel Companion** - Plan the perfect trip in seconds with intelligent itinerary generation powered by **Qubrid AI (Mistral 7B)**.

🌐 **Live Demo:** [https://journi-ai-ai-trip-planner-anzy.vercel.app/](https://journi-ai-ai-trip-planner-anzy.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

🤖 **AI-Powered Itinerary Generation** - Get personalized day-by-day trip plans with activities, restaurants, and hotel recommendations powered by **Qubrid AI (Mistral 7B)**.

📸 **High-Quality Imagery** - Place images sourced via robust **Bing Images Integration** for crisp, scenic visuals.

🗺️ **Smart Location Search** - Real-time location search with Google Places API integration.

🏨 **Hotel Recommendations** - Curated hotel options with ratings, prices in Indian Rupees (₹), and direct Google Maps integration.

🍽️ **Restaurant Suggestions** - Discover the best local cuisines with ratings and location details.

🎯 **Customizable Trip Planning** - Choose from solo, couple, family, friends, or custom group sizes.

💰 **Budget Options** - Select from budget-friendly, moderate, or luxury travel experiences.

🔐 **Secure Authentication** - Auth0 integration for secure user login and trip management.

📱 **Responsive Design** - Beautiful, mobile-first UI built with Tailwind CSS and Shadcn/ui components.

💾 **Save Your Trips** - Store and manage multiple trip plans with Firebase Firestore.

⚡ **Lightning Fast** - Built with Vite for optimal development and production performance.

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

- **Qubrid AI** - AI-powered trip generation (Mistral 7B Model)
- **Vercel Serverless Functions** - `/api/place` endpoint for Bing scraping
- **Firebase 12.3.0** - Firestore database for trip storage
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

1. **Qubrid AI API Key** - [Get it here](https://platform.qubrid.com/)
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
   # Qubrid AI (Mistral 7B)
   VITE_QUBRID_API_KEY=your_qubrid_api_key_here

   # Google Maps (Client-side)
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

   # Auth0
   VITE_AUTH0_DOMAIN=your_auth0_domain.auth0.com
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

   - API proxy server (for Bing Images)
   - Vite development server

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables in Vercel**
   
   Add these in Vercel Dashboard → Settings → Environment Variables:
   
   ```env
   VITE_QUBRID_API_KEY=your_qubrid_api_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   
   VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_REDIRECT_URI=https://your-app.vercel.app/create-trip
   
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   # ... other firebase keys
   ```

4. **Deploy**
   - Vercel will automatically build and deploy.
   - The `/api/place` function handles image scraping serverlessly.

---

## 🤝 Contributing

Contributions are welcome! Please open a Pull Request.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by Willy EverGreen**

⭐ Star this repo if you find it helpful!

</div>
