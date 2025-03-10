//src/components/auth/PrivateRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading, error } = useAuth();
  const location = useLocation();

  // Show a loading spinner while authentication state is loading

  // If there's an error, show the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If user is not authenticated, redirect to login page
  // Only redirect if we're not loading - this is crucial to prevent the loop
  if (!loading && !currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render children components
  return children;
};

export default PrivateRoute;
