import React, { useState, createContext } from "react";
import { useContext } from "react";

const ConversationContext = createContext();

export function useConversationContext() {
  return useContext(ConversationContext);
}

export function ConversationContextProvider({ children }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
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
