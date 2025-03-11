// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, updateUserProfileInDB } from "@/services/db";
import { updateUserProfile } from "@/services/auth";
import { logCustomEvent } from "@/services/analytics";

const Profile = () => {
  const { currentUser } = useAuth();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name) => {
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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">App Settings</h1>

      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="p-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-lg font-medium mb-4">Preferences</h3>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Enable Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile.preferences.notifications}
                onChange={() => handleToggleChange("notifications")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={profile.preferences.darkMode}
                onChange={() => handleToggleChange("darkMode")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
