import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook for fetching conversations from the server.
 * @returns {object} - Loading state and conversation data.
 */
function useGetConversations() {
  // Initialize loading state
  const [loading, setLoading] = useState(false);
  // Initialize conversations state
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Function to fetch conversations from the server
    async function getConversations() {
      // Set loading state to true when fetching starts
      setLoading(true);
      try {
        // Fetch conversations from the server
        const res = await fetch("/api/users");
        // Parse response data
        const data = await res.json();
        // Check for errors in the response
        if (data.error) {
          // Throw an error if an error message is received
          throw new Error(data.error);
        }
        // Set conversations state with the received data
        setConversations(data);
      } catch (error) {
        // Display error toast if an error occurs during fetching
        toast.error(error.message);
      } finally {
        // Set loading state to false after fetching completes
        setLoading(false);
      }
    }
    // Call the getConversations function when the component mounts
    getConversations();
  }, []);

  // Return loading state and conversations data
  return { loading, conversations };
}

export default useGetConversations;
