// src/hooks/useAnalytics.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "@/services/analytics";

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Automatically derive the page name from the pathname
    const pageName = location.pathname.replace("/", "") || "home"; // Default to 'home' for the root path

    // Log the page view
    logPageView(pageName, {
      path: location.pathname,
      search: location.search,
    });
  }, [location]); // Runs every time the location changes
}
