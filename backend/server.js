import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Middleware to parse cookies in requests
app.use(cookieParser());

// Route middleware for authentication routes
app.use("/api/auth", authRoutes);

// Route middleware for message routes
app.use("/api/messages", messageRoutes);

// Route middleware for user routes
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Define the port on which the server will listen
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  // Connect to MongoDB
  connectToMongoDB();

  // Log server start message
  console.log(`Listening on http://localhost:${PORT}`);
});
