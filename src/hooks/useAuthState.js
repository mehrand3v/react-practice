
// Extracting Firebase Authentication Logic into a Custom Hook:
//  Since you're using onAuthStateChange from Firebase to monitor the authentication state,
// it might make sense to move that logic into a custom hook. This makes your AuthProvider component cleaner and the logic more reusable
// in case you need to use it outside of context (e.g., in another component).

// Let's create a hook that handles the authentication state logic.

// src/hooks/useAuthState.js

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Ensure you import Firebase's onAuthStateChanged
import { auth } from "@/services/auth"; // Import your firebase auth instance
const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Ensure loading only changes once, to avoid infinite loop
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this only runs once

  return { currentUser, loading };
};

export default useAuthState;
