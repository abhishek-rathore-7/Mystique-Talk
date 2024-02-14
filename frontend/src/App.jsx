import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Home from "./pages/home/Home.jsx";

/**
 * Main component of the application.
 * Renders different pages based on user authentication status.
 * @returns {JSX.Element} - Returns the JSX for rendering the application.
 */
function App() {
  // Accessing the authentication context
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 flex h-screen justify-center items-center">
      <Routes>
        {/* Route for Home page */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        ></Route>
        {/* Route for Login page */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        ></Route>
        {/* Route for Signup page */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        ></Route>
      </Routes>
      {/* Toaster for displaying toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
