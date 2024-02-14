import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../context/ConversationContext";

/**
 * Custom hook for fetching messages for the selected conversation.
 * @returns {object} - Loading state and messages data.
 */
function useGetMessages() {
  // Initialize loading state
  const [loading, setLoading] = useState(false);
  // Destructure selectedConversation and setMessages function from ConversationContext
  const { messages, selectedConversation, setMessages } =
    useConversationContext();

  // Effect to fetch messages when selectedConversation changes
  useEffect(() => {
    // Function to fetch messages
    async function getMessages() {
      // Set loading state to true when fetching starts
      setLoading(true);
      try {
        // Fetch messages from the server using the selected conversation ID
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        // Parse response data
        const data = await res.json();

        // Check for errors in the response
        if (data.error) {
          // Throw an error if an error message is received
          throw new Error(data.error);
        }
        // Set messages state with the received data
        setMessages(data);
      } catch (error) {
        // Display error toast if an error occurs during fetching
        toast.error(error.message);
      } finally {
        // Set loading state to false after fetching completes
        setLoading(false);
      }
    }

    // Check if a selected conversation is available
    if (selectedConversation?._id) {
      // Call the getMessages function to fetch messages
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]); // Depend on selectedConversation ID and setMessages function

  // Return loading state and messages data
  return { messages, loading };
}

export default useGetMessages;
