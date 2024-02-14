import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ConversationContextProvider } from "./context/ConversationContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

// Render the application inside a React root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the application with BrowserRouter for routing */}
    <BrowserRouter>
      {/* Provide the ConversationContext to the application */}
      <ConversationContextProvider>
        {/* Provide the AuthContext to the application */}
        <AuthContextProvider>
          {/* Provide the SocketContext to the application */}
          <SocketContextProvider>
            {/* The main application component */}
            <App />
          </SocketContextProvider>
        </AuthContextProvider>
      </ConversationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
