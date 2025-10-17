// src/service/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👈 add this

const firebaseConfig = {
  apiKey: "AIzaSyDELd36d9svlAElIxiYaM5fBQ4oHacW90g",
  authDomain: "ai-trip-planner-50d91.firebaseapp.com",
  projectId: "ai-trip-planner-50d91",
  storageBucket: "ai-trip-planner-50d91.firebasestorage.app",
  messagingSenderId: "847156243077",
  appId: "1:847156243077:web:fb8a61e156cc9db5fd57ec",
  measurementId: "G-YE2NFD7F00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // 👈 create Firestore instance

export { app, analytics, db }; // 👈 export db
