// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import router from "@/router/appRouter";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <LoadingSpinner />
          <RouterProvider router={router} />
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
