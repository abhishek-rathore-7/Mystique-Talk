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
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // console.log(message);

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
