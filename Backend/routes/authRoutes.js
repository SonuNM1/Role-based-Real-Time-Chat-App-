import express from "express";
import {verifyEmail} from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { signup, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, signupSchema } from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User Signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: User already exists
 */

router.post("/signup", validate(signupSchema), signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       403:
 *         description: Invalid credentials or not verified
 */

router.post("/login", authLimiter, validate(loginSchema), login);

/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify user email address
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token sent to user's email
 *     responses:
 *       200:
 *         description: Email successfully verified (HTML response)
 *       400:
 *         description: Invalid or expired token
 */

router.get("/verify/:token", verifyEmail);

export default router;
