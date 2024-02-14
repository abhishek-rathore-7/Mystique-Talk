import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for handling user login functionality.
 * @returns {Object} - Returns an object containing isLoading state and login function.
 */
function useLogin() {
  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);
  // Accessing the authentication context
  const { setAuthUser } = useAuthContext();

  /**
   * Function to validate login input.
   * @param {Object} credentials - The user login credentials.
   * @param {string} credentials.username - The username.
   * @param {string} credentials.password - The password.
   * @returns {boolean} - Returns true if validation succeeds, false otherwise.
   */
  function validateInput({ username, password }) {
    if (!username.trim() || !password.trim()) {
      // Show error toast if any field is empty
      toast.error("Please enter all fields");
      return false;
    }
    return true;
  }

  /**
   * Function to perform user login.
   * @param {Object} credentials - The user login credentials.
   * @param {string} credentials.username - The username.
   * @param {string} credentials.password - The password.
   */
  async function login({ username, password }) {
    // Set loading state to true when starting login process
    setIsLoading(true);
    try {
      // Validate input before making the API call
      if (!validateInput({ username, password })) return;

      // Making the API call to login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Parsing the response data
      const data = await response.json();

      // Check for errors in the response
      if (data.error) {
        throw new Error(data.error);
      }

      // Set the authenticated user in the context
      localStorage.setItem("mystique-talk-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      // Show error toast if login fails
      toast.error(error.message);
    } finally {
      // Set loading state to false after login attempt
      setIsLoading(false);
    }
  }

  // Return loading state and login function
  return { isLoading, login };
}

export default useLogin;
