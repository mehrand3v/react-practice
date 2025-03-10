// src/pages/Profile.jsx
import { useState } from "react";
import { updateUserProfile, getCurrentUser } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await updateUserProfile(getCurrentUser(), { displayName });
      setMessage("Profile updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-6">Your Profile</h1>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
      )}

      {message && (
        <div className="bg-green-500 text-white p-3 rounded mb-4">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="text"
              disabled
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={currentUser?.email || ""}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
        </div>

        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-300"
          >
            Display Name
          </label>
          <div className="mt-1">
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
