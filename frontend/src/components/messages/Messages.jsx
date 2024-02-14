import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessage.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message.jsx";

/**
 * Messages component for displaying chat messages.
 * @returns {JSX.Element} - Returns the JSX for rendering the messages.
 */
const Messages = () => {
  // Fetch messages from API
  const { messages, loading } = useGetMessages();

  // Listen for new messages
  useListenMessages();

  // Reference to the end of messages for auto-scrolling
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages when new messages are received
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollTimeout = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* Render messages */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={messagesEndRef}>
            <Message message={message} />
          </div>
        ))}
      {/* Render message skeletons while loading */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {/* Render message prompt when no messages */}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation</p>
      )}
    </div>
  );
};

export default Messages;
