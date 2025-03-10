// // src/pages/auth/ForgotPassword.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { resetPassword } from "@/services/auth";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       await resetPassword(email);
//       setMessage("Check your email for further instructions");
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       {error && (
//         <div className="bg-red-500 text-white p-3 rounded">{error}</div>
//       )}

//       {message && (
//         <div className="bg-green-500 text-white p-3 rounded">{message}</div>
//       )}

//       <div>
//         <label
//           htmlFor="email"
//           className="block text-sm font-medium text-gray-300"
//         >
//           Email address
//         </label>
//         <div className="mt-1">
//           <input
//             id="email"
//             name="email"
//             type="email"
//             required
//             className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {loading ? "Sending..." : "Reset Password"}
//         </button>
//       </div>

//       <div className="text-center">
//         <Link
//           to="/login"
//           className="font-medium text-indigo-400 hover:text-indigo-300"
//         >
//           Back to login
//         </Link>
//       </div>
//     </form>
//   );
// }
