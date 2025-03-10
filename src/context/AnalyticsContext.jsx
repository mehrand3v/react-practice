// src/context/AnalyticsContext.jsx
import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "@/services/firebase/analytics";

const AnalyticsContext = createContext(null);

export const useAnalytics = () => useContext(AnalyticsContext);

export function AnalyticsProvider({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Log page view when location changes
    const pageName = location.pathname.replace("/", "") || "home";
    logPageView(pageName, {
      path: location.pathname,
      search: location.search,
      title: document.title, // Additional context: page title
      referrer: document.referrer, // Additional context: referrer
    });
  }, [location]);

  // You can include any other values you want to share globally via context here.
  return (
    <AnalyticsContext.Provider value={{}}>{children}</AnalyticsContext.Provider>
  );
}
