# 🌍 JOURNI AI - AI-Powered Trip Planner

> **Your Personal AI Travel Companion** - Plan the perfect trip in seconds with intelligent itinerary generation powered by **NVIDIA NIM (Llama 3.1)**.

🌐 **Live Demo:** [https://journi-ai-ai-trip-planner-anzy.vercel.app/](https://journi-ai-ai-trip-planner-anzy.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

🤖 **AI-Powered Itinerary Generation** - Get personalized day-by-day trip plans with activities, restaurants, and hotel recommendations powered by **NVIDIA NIM (Llama 3.1)**.

📸 **High-Quality Imagery** - Place images sourced via robust **Bing Images Integration** for crisp, scenic visuals.

🗺️ **Smart Location Search** - Real-time location search with **Komoot Photon API** (OpenStreetMap) integration.

🏨 **Hotel Recommendations** - Curated hotel options with ratings, price ranges, and addresses.

🍽️ **Restaurant Suggestions** - Discover the best local cuisines with ratings and location details.

🎯 **Customizable Trip Planning** - Choose from solo, couple, family, or friends group sizes.

💰 **Budget Options** - Select from budget-friendly, moderate, or luxury travel experiences.

🔐 **Secure Authentication** - Auth0 integration for secure user login and trip management.

💾 **Save Your Trips** - Store and manage multiple trip plans with Firebase Firestore.

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite 7.1.6** - Next-generation frontend tooling
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Framer Motion** - Smooth UI animations
- **Lucide React** - Beautiful icon library

### Backend & Services
- **NVIDIA NIM** - AI-powered trip generation (Llama 3.1 Model)
- **Express Proxy** - Local backend for API routing and scraping
- **Firebase 12.3.0** - Firestore database and Analytics
- **Komoot Photon API** - Global location search
- **Auth0** - Authentication and user management

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Required API Keys
1. **NVIDIA API Key** - [Get it here](https://build.nvidia.com/meta/llama-3_1-8b-instruct)
2. **Auth0 Credentials** - [Get it here](https://auth0.com/)
3. **Firebase Config** - [Get it here](https://firebase.google.com/)

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
   Create a `.env.local` file in the root directory:
   ```env
   # AI & APIs
   VITE_NVIDIA_API_KEY=your_nvidia_key_here
   
   # Auth0
   VITE_AUTH0_DOMAIN=your_auth0_domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   
   # Firebase
   VITE_FIREBASE_API_KEY=...
   VITE_PROJECT_ID=...
   # (Copy the rest from .env.local.example)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start both the Express API and the Vite frontend simultaneously.

---

## 🚢 Deployment

### Deploy to Vercel
1. Push your code to GitHub.
2. Import the project to Vercel.
3. Add all your `VITE_` environment variables in the Vercel Dashboard.
4. The serverless functions in the `/api` directory will automatically handle the chat and place requests in production.

---

<div align="center">

**Made with ❤️ by Willy EverGreen**

⭐ Star this repo if you find it helpful!

</div>
