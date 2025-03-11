// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import router from "@/router/appRouter";

function App() {
  return (
    <AuthProvider>

        <RouterProvider router={router} />

    </AuthProvider>
  );
}

export default App;
