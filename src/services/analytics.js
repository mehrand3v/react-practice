// src/services/analytics.js

import { analytics } from "@/services/firebase"; // Import analytics from firebase.js
import { logEvent } from "firebase/analytics";

// Helper function to safely log events with error handling
const safeLogEvent = async (eventName, eventParams = {}) => {
  try {
    // Only log events if analytics is initialized
    if (analytics) {
      await logEvent(analytics, eventName, eventParams);
    } else {
      console.warn(
        `Analytics is not initialized. Event '${eventName}' not logged.`
      );
    }
  } catch (error) {
    console.error(`Error logging event: ${eventName}`, error);
  }
};

// Log custom events
export const logCustomEvent = (eventName, eventParams = {}) => {
  return safeLogEvent(eventName, eventParams);
};

// Log page view
export const logPageView = (pageName, pageParams = {}) => {
  return safeLogEvent("page_view", {
    page_title: pageName,
    ...pageParams,
  });
};

// Log user sign-in
export const logUserSignIn = (method = "email") => {
  return safeLogEvent("login", { method });
};

// Log user sign-up
export const logUserSignUp = (method = "email") => {
  return safeLogEvent("sign_up", { method });
};
