import { createContext, useContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 * @returns {object} - The authentication context value.
 */
export const useAuthContext = () => {
  return useContext(AuthContext);
};

/**
 * AuthContextProvider component for managing authentication state.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} - Returns the JSX for rendering the authentication context provider.
 */
export const AuthContextProvider = ({ children }) => {
  // Initialize authentication user state, retrieve from local storage if available
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    // Provide authentication context to child components
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
