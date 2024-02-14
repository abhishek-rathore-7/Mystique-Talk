import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/getRandomEmoji.js";

/**
 * Conversations component for displaying a list of conversations.
 * @returns {JSX.Element} - Returns the JSX for rendering the conversations.
 */
const Conversations = () => {
  // Fetch conversations from API
  const { conversations, loading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Render loading spinner while loading */}
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        // Map through conversations and render Conversation component
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            isLastIdx={conversations.length - 1 === idx}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
