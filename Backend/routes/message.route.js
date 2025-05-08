// routes/message.routes.js

import express from 'express';
import { sendPrivateMessage, sendGroupMessage } from '../controllers/message.controller.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - fromUserId
 *         - toUserId
 *         - message
 *       properties:
 *         fromUserId:
 *           type: string
 *           description: The ID of the user sending the message
 *         toUserId:
 *           type: string
 *           description: The ID of the recipient user
 *         message:
 *           type: string
 *           description: The message content
 */

/**
 * @swagger
 * /api/message/private-message:
 *   post:
 *     summary: Send a private message to another user
 *     description: Sends a private message to the specified recipient via WebSocket
 *     operationId: sendPrivateMessage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Private message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       500:
 *         description: Error sending private message
 */

router.post('/private-message', sendPrivateMessage);

// docs/swagger.js

/**
 * @swagger
 * /api/message/group-message:
 *   post:
 *     summary: Send a group message to all users in a group
 *     description: Sends a message to all users in the specified group via WebSocket
 *     operationId: sendGroupMessage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - fromUserId
 *               - message
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group
 *               fromUserId:
 *                 type: string
 *                 description: The ID of the user sending the message
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       200:
 *         description: Group message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     groupId:
 *                       type: string
 *                     fromUserId:
 *                       type: string
 *                     message:
 *                       type: string
 *       500:
 *         description: Error sending group message
 */


router.post('/group-message', sendGroupMessage);

export default router;
