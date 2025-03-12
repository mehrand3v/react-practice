// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, updateUserProfileInDB } from "@/services/db";
import { updateUserProfile } from "@/services/auth";
import { logCustomEvent } from "@/services/analytics";
import { useTheme } from "@/context/ThemeContext";

const Profile = () => {
  const { currentUser } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    preferences: {
      notifications: true,
      darkMode: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (currentUser) {
          // Basic user info from Firebase Auth
          setProfile((prev) => ({
            ...prev,
            displayName: currentUser.displayName || "",
            email: currentUser.email || "",
          }));

          // Extended profile info from Firestore
          const userProfile = await getUserProfile(currentUser.uid);
          if (userProfile) {
            setProfile((prev) => ({
              ...prev,
              companyName: userProfile.companyName || "",
              phoneNumber: userProfile.phoneNumber || "",
              preferences: userProfile.preferences || {
                notifications: true,
                darkMode: false,
              },
            }));
          } else {
            // Create a default profile if none exists
            await updateUserProfileInDB(currentUser.uid, {
              companyName: "",
              phoneNumber: "",
              preferences: {
                notifications: true,
                darkMode: false,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ type: "error", text: "Failed to load profile data" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // Add this before your existing dark mode useEffect
  useEffect(() => {
    // On initial load, check localStorage for dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDarkMode = savedDarkMode === "true";
      setProfile((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          darkMode: isDarkMode,
        },
      }));
    }
  }, []);

  // Add this useEffect to apply dark mode globally
  useEffect(() => {
    if (profile.preferences.darkMode) {
      document.documentElement.classList.add("dark");
       localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
          localStorage.setItem("darkMode", "false");
    }
  }, [profile.preferences.darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name) => {
     if (name === "darkMode") {
       setDarkMode(!darkMode);
     }
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: !prev.preferences[name],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Update Firebase Auth profile (displayName)
      await updateUserProfile(currentUser, {
        displayName: profile.displayName,
      });

      // Update extended profile in Firestore
      await updateUserProfileInDB(currentUser.uid, {
        companyName: profile.companyName,
        phoneNumber: profile.phoneNumber,
        preferences: profile.preferences,
      });

      setMessage({ type: "success", text: "Profile updated successfully" });

      // Log the profile update event
      logCustomEvent("profile_updated", {
        user_id: currentUser.uid,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Add dark mode variants to all your components
  return (
    <div className="max-w-2xl mx-auto dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">
        App Settings
      </h1>

      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Apply similar dark mode classes to other inputs */}

        <div className="border p-4 rounded-md dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-4 dark:text-white">
            Preferences
          </h3>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Enable Notifications
            </span>
            {/* Toggle switch remains the same */}
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Dark Mode
            </span>
            {/* Toggle switch remains the same */}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:focus:ring-indigo-600"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
