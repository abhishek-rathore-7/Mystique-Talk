import { useConversationContext } from "../../context/ConversationContext.jsx";
import { useSocketContext } from "../../context/SocketContext.jsx";

/**
 * Conversation component for displaying conversation details.
 * @param {Object} props - Props object containing conversation details.
 * @param {Object} props.conversation - Conversation object containing details like profile picture, full name, and gender.
 * @param {boolean} props.isLastIdx - Flag indicating whether the conversation is the last in the list.
 * @returns {JSX.Element} - Returns the JSX for rendering the conversation.
 */
const Conversation = ({ conversation, isLastIdx, emoji }) => {
  const { profilePic, fullName } = conversation;

  // Accessing selected conversation from context
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

  // Check if conversation is selected
  const isSelected = selectedConversation?._id === conversation._id;

  // Accessing online users from context
  const { onlineUsers } = useSocketContext();

  // Check if conversation user is online
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      {/* Conversation item */}
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Avatar */}
        <div className={`avatar ${isOnline && "online"}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>

        {/* Conversation details */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            {/* User name */}
            <p className="font-bold text-gray-200">{fullName}</p>
            {/* Emoji */}
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      {!isLastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
