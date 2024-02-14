import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext.jsx";

// Create the socket context
const SocketContext = createContext();

/**
 * Custom hook to access the socket context.
 * @returns {object} - The socket context value.
 */
export function useSocketContext() {
  return useContext(SocketContext);
}

/**
 * SocketContextProvider component for managing socket connection and online users.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} - Returns the JSX for rendering the socket context provider.
 */
export function SocketContextProvider({ children }) {
  // Initialize socket state
  const [socket, setSocket] = useState(null);
  // Initialize online users state
  const [onlineUsers, setOnlineUsers] = useState([]);
  // Access authentication context
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Establish socket connection if user is authenticated
    if (authUser) {
      const socket = io("https://mystique-talk.onrender.com/", {
        query: {
          userId: authUser._id,
        },
      });

      // Set the socket state
      setSocket(socket);

      // Listen for online user updates
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Close socket connection on component unmount
      return () => socket.close();
    } else {
      // Close socket connection if user is not authenticated
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    // Provide socket context to child components
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}
