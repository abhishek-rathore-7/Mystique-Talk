import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

/**
 * Express router instance for authentication routes
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for user login
 * @name POST /api/auth/login
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
router.post("/login", login);

/**
 * Route for user signup
 * @name POST /api/auth/signup
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
router.post("/signup", signup);

/**
 * Route for user logout
 * @name POST /api/auth/logout
 * @function
 * @memberof router
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {void}
 */
router.post("/logout", logout);

export default router;
