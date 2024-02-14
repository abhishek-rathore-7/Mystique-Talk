import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversationContext } from "../context/ConversationContext";
import notificationSound from "../assets/sounds/notification.mp3";

/**
 * Custom hook for listening to new messages from the socket.
 */
function useListenMessages() {
  // Retrieve socket and messages from the context
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationContext();

  useEffect(() => {
    // Listen for "newMessage" event from the socket
    socket?.on("newMessage", (newMessage) => {
      // Mark new message to shake
      newMessage.shouldShake = true;
      // Play notification sound
      const sound = new Audio(notificationSound);
      sound.play();
      // Update messages state with the new message
      setMessages([...messages, newMessage]);
    });

    // Clean up event listener when component unmounts
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]); // Depend on socket, setMessages, and messages

  // No return value needed
}

export default useListenMessages;
