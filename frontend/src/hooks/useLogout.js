import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for handling user logout functionality.
 * @returns {Object} - Returns an object containing loading state and logout function.
 */
function useLogout() {
  // State to track loading state
  const [loading, setLoading] = useState(false);
  // Accessing the authentication context
  const { setAuthUser } = useAuthContext();

  /**
   * Function to perform user logout.
   */
  async function logout() {
    // Set loading state to true when starting logout process
    setLoading(true);
    try {
      // Making the API call to logout
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Parsing the response data
      const data = await response.json();

      // Check if logout was successful
      if (response.ok) {
        // Clear user data from localStorage and reset auth user context
        localStorage.removeItem("mystique-talk-user");
        setAuthUser(null);
      } else {
        // If logout failed, throw an error with the message received from the server
        throw new Error(data.error || "Logout failed");
      }
    } catch (error) {
      // Notify user about the error
      toast.error(error.message);
    } finally {
      // Reset loading state regardless of success or failure
      setLoading(false);
    }
  }

  // Return loading state and logout function
  return { loading, logout };
}

export default useLogout;
