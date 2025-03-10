
// By extracting the onAuthStateChanged logic into a custom hook(useAuthState),
//     your AuthContext is now more focused on context management.
// The custom hook can now be reused independently if needed.

// src/context/AuthContext.jsx
import { createContext, useContext } from "react";
import useAuthState from "@/hooks/useAuthState"; // Custom hook to handle auth state

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const { currentUser, loading, error } = useAuthState(); // Get auth state from custom hook

  // Provide the auth context value, but only render children after loading is complete
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    error, // Optionally pass error state for handling failed login
  };

  // Always render the AuthContext.Provider, but render a loading indicator
  // instead of children if still loading
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
