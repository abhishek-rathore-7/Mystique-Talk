import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime.js";

/**
 * Message component for displaying chat messages.
 * @param {Object} props - Props object containing the message to display.
 * @param {string} props.message - The message content to display.
 * @returns {JSX.Element} - Returns the JSX for rendering the message.
 */
const Message = ({ message }) => {
  // Accessing authentication context
  const { authUser } = useAuthContext();

  // Accessing conversation context
  const { selectedConversation } = useConversationContext();

  // Determine if the message is from the current user
  const fromMe = message.senderId === authUser._id;

  // Extracting formatted time from message creation timestamp
  const formattedTime = extractTime(message.createdAt);

  // Determine chat bubble alignment based on message sender
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  // Determine profile picture URL based on message sender
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  // Determine bubble background color based on message sender
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // Determine whether to apply a shake animation to the message bubble
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {/* Avatar Image */}
          <img alt="User Avatar" src={profilePic} />
        </div>
      </div>
      {/* Message Bubble */}
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {/* Display Message */}
        {message.message}
      </div>
      {/* Message Footer */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {/* Message Time */}
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
