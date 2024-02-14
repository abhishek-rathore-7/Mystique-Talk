import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import { useState } from "react";

/**
 * MessageInput component for entering and sending messages.
 * @returns {JSX.Element} - Returns the JSX for rendering the message input form.
 */
const MessageInput = () => {
  // State for message input value
  const [message, setMessage] = useState("");

  // Custom hook to send messages
  const { loading, sendMessage } = useSendMessage();

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // Check if message is empty or whitespace
    if (!message.trim()) return;

    // Send message
    await sendMessage(message);

    // Clear message input
    setMessage("");
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      {/* Message input field */}
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        {/* Send button */}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          disabled={loading}
        >
          {/* Send icon or loading spinner */}
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
