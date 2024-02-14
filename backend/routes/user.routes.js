import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

/**
 * Express router instance for user routes
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route to get users for sidebar
 * @name GET /api/users
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {void}
 */
router.get("/", protectRoute, getUsersForSidebar);

export default router;
