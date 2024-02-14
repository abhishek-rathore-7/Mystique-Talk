import { useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../context/ConversationContext";

/**
 * Custom hook for sending messages in a conversation.
 * @returns {Object} - Returns an object containing loading state and sendMessage function.
 */
function useSendMessage() {
  // State to track loading state
  const [loading, setLoading] = useState(false);
  // Accessing the conversation context
  const { selectedConversation, messages, setMessages } =
    useConversationContext();

  /**
   * Function to send a message in the selected conversation.
   * @param {string} message - The message content to send.
   */
  async function sendMessage(message) {
    // Set loading state to true when starting the message sending process
    setLoading(true);
    try {
      // Making the API call to send the message
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      // Parsing the response data
      const data = await res.json();

      // Check for errors in the response
      if (data.error) throw new Error(data.error);

      // Update the messages state with the new message
      setMessages([...messages, data]);
    } catch (error) {
      // Notify user about the error
      toast.error(error.message);
    } finally {
      // Reset loading state regardless of success or failure
      setLoading(false);
    }
  }

  // Return loading state and sendMessage function
  return { loading, sendMessage };
}

export default useSendMessage;
