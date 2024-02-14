import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

/**
 * Express router instance for message routes
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route to get messages for a conversation
 * @name GET /api/messages/:id
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {void}
 */
router.get("/:id", protectRoute, getMessages);

/**
 * Route to send a message in a conversation
 * @name POST /api/messages/send/:id
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {void}
 */
router.post("/send/:id", protectRoute, sendMessage);

export default router;
