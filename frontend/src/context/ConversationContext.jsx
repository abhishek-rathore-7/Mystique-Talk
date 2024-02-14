import React, { useState, createContext } from "react";
import { useContext } from "react";

// Create the conversation context
const ConversationContext = createContext();

/**
 * Custom hook to access the conversation context.
 * @returns {object} - The conversation context value.
 */
export function useConversationContext() {
  return useContext(ConversationContext);
}

/**
 * ConversationContextProvider component for managing conversation state.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} - Returns the JSX for rendering the conversation context provider.
 */
export function ConversationContextProvider({ children }) {
  // Initialize conversation state
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    // Provide conversation context to child components
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
