import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import useListenMessages from "../../hooks/useListenMessage.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import Message from "./Message.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const messagesEndRef = useRef(null);

  console.log(messages);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollTimeout = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={messagesEndRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start conversation</p>
      )}
    </div>
  );
};

export default Messages;
