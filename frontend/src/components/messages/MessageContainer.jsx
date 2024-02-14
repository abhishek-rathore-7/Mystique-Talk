import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useConversationContext } from "../../context/ConversationContext.jsx";
import { useEffect } from "react";

/**
 * Component representing the container for messages.
 * @returns {JSX.Element} The message container component.
 */
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

  // Reset selected conversation when component unmounts
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {/* Render when no conversation is selected */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        // Render when conversation is selected
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          {/* Render messages */}
          <Messages />
          {/* Render message input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

/**
 * Component representing the UI when no chat is selected.
 * @returns {JSX.Element} The UI for no chat selected.
 */
const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
