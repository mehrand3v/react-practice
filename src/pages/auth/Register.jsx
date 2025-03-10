// // src/pages/auth/Register.jsx
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "@/services/auth";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [displayName, setDisplayName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await registerUser(email, password, displayName);
//       navigate("/");
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

//       <div>
//         <label
//           htmlFor="displayName"
//           className="block text-sm font-medium text-gray-300"
//         >
//           Full Name
//         </label>
//         <div className="mt-1">
//           <input
//             id="displayName"
//             name="displayName"
//             type="text"
//             required
//             className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         </div>
//       </div>

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
//         <label
//           htmlFor="password"
//           className="block text-sm font-medium text-gray-300"
//         >
//           Password
//         </label>
//         <div className="mt-1">
//           <input
//             id="password"
//             name="password"
//             type="password"
//             required
//             className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         >
//           {loading ? "Creating account..." : "Create account"}
//         </button>
//       </div>

//       <div className="text-center">
//         <Link
//           to="/login"
//           className="font-medium text-indigo-400 hover:text-indigo-300"
//         >
//           Already have an account? Sign in
//         </Link>
//       </div>
//     </form>
//   );
// }
