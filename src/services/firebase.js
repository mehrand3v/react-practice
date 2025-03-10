// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration object with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Analytics config
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics only in production
let analytics = null;
if (import.meta.env.VITE_FIREBASE_ANALYTICS_ENABLED === "true") {
  try {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics initialized");
  } catch (error) {
    console.warn("Firebase Analytics initialization failed:", error.message);
  }
} else {
  console.warn("Firebase Analytics is disabled in the current environment.");
}

// Initialize Firebase Authentication
const auth = getAuth(app); // Initialize Firebase Auth

// Export the app, auth, and analytics for use in other files
export { app, auth, analytics };