import express from 'express'
import { adminLogin, createAdmin } from '../controllers/auth.controller.js'
import {
    protect, 
    isAdmin
} from '../middlewares/auth.js'

const router = express.Router()

// Only authenticated admins can access 

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: Create a new admin (only allowed for existing admins)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - country
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               country:
 *                 type: string
 *                 example: USA
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Email already in use
 *       403:
 *         description: Forbidden – Only admins can create another admin
 *       500:
 *         description: Internal server error
 */

router.post('/create', protect, isAdmin, createAdmin)

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60b8c0f78e4eab431e0b8b8f"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Invalid credentials
 *       403:
 *         description: Email not verified
 *       500:
 *         description: Internal server error
 */

router.post('/login', adminLogin)



export default router ; 