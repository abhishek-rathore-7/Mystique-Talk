import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

/**
 * Custom hook for handling user signup functionality.
 * @returns {Object} - Returns an object containing isLoading state and signup function.
 */
function useSignup() {
  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);
  // Accessing the authentication context
  const { setAuthUser } = useAuthContext();

  /**
   * Function to validate signup inputs.
   * @param {Object} userData - The user signup data.
   * @param {string} userData.fullName - The user's full name.
   * @param {string} userData.username - The user's username.
   * @param {string} userData.password - The user's password.
   * @param {string} userData.confirmPassword - The user's confirmation password.
   * @param {string} userData.gender - The user's gender.
   * @returns {boolean} - Returns true if validation succeeds, false otherwise.
   */
  function validateInputs({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) {
    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !gender.trim()
    ) {
      // Show error toast if any field is empty
      toast.error("Please enter all fields");
      return false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      // Show error toast if passwords do not match
      toast.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      // Show error toast if password length is less than 6 characters
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (/\s/.test(username.trim())) {
      toast.error("Username may not contain whitespace");
      return false;
    }

    return true;
  }

  /**
   * Function to perform user signup.
   * @param {Object} userData - The user signup data.
   * @param {string} userData.fullName - The user's full name.
   * @param {string} userData.username - The user's username.
   * @param {string} userData.password - The user's password.
   * @param {string} userData.confirmPassword - The user's confirmation password.
   * @param {string} userData.gender - The user's gender.
   */
  async function signup({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) {
    // Validate signup inputs
    const isValid = validateInputs({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!isValid) return;

    // Set loading state to true when starting signup process
    setIsLoading(true);
    try {
      // Making the API call to signup
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      // Parsing the response data
      const data = await response.json();

      // Check if signup was successful
      if (response.ok) {
        // Save user data to localStorage and set the authenticated user in the context
        localStorage.setItem("mystique-talk-user", JSON.stringify(data));
        setAuthUser(data);
      } else {
        // If signup failed, throw an error with the message received from the server
        throw new Error(data.error || "Signup failed");
      }
    } catch (error) {
      // Notify user about the error
      toast.error(error.message);
    } finally {
      // Reset loading state regardless of success or failure
      setIsLoading(false);
    }
  }

  // Return loading state and signup function
  return { isLoading, signup };
}

export default useSignup;
