import Conversation from "./Conversation.jsx";
import useGetConversations from "../../hooks/useGetConversations.js";

const Conversations = () => {
  const { conversations, loading } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            isLastIdx={conversations.length - 1 === idx}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
