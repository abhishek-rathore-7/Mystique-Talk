import { Server } from "socket.io";
import http from "http";
import express from "express";

/**
 * Express app instance
 * @type {express.Express}
 */
const app = express();

/**
 * HTTP server instance
 * @type {http.Server}
 */
const server = http.createServer(app);

/**
 * Socket.IO server instance
 * @type {Server}
 */
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

/**
 * Map to store user socket IDs
 * @type {Object<string, string>}
 */
const userSocketMap = {};

/**
 * Function to get the socket ID of a user
 * @param {string} receiverId - The ID of the receiver user
 * @returns {string | undefined} - The socket ID of the user
 */
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Socket.IO connection event
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  // Add user's socket ID to the map
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit event to get online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Socket.IO disconnect event
  socket.on("disconnect", () => {
    // Remove user's socket ID from the map
    delete userSocketMap[userId];

    // Emit event to get online users after user disconnects
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

/**
 * Exporting Express app, Socket.IO server, and HTTP server
 */
export { app, io, server };
