
import Message from '../models/message.model.js';

export const sendPrivateMessage = async (req, res) => {
    const { fromUserId, toUserId, message } = req.body;

    try {
        // Save message to database
        const savedMessage = await Message.create({
            from: fromUserId,
            to: toUserId,
            message,
            type: 'private',
        });

        // Simulate the WebSocket event
        const recipientSocketId = onlineUsers.get(toUserId); // Assuming onlineUsers is in-memory storage of socket IDs
        if (recipientSocketId) {
            // Trigger the WebSocket event and send the message to the recipient
            io.to(recipientSocketId).emit('receivePrivateMessage', {
                fromUserId,
                message: savedMessage.message,
            });
        }

        return res.status(200).json({
            message: 'Private message sent successfully',
            data: savedMessage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending private message' });
    }
};

export const sendGroupMessage = async (req, res) => {
    const { groupId, fromUserId, message } = req.body; // Extracting data from the request body

    try {
        // Save the group message to the database
        const savedMessage = await Message.create({
            from: fromUserId, // Sender's user ID
            groupId,          // Group ID where the message is sent
            message,          // The message content
            type: 'group',    // Message type (group message)
        });

        // Find the group to emit the message to all users
        const groupSocketIds = getGroupSocketIds(groupId); // Assuming this function retrieves all online user socket IDs for the group

        if (groupSocketIds && groupSocketIds.length > 0) {
            // Emit the message to all users in the group
            groupSocketIds.forEach(socketId => {
                io.to(socketId).emit('receiveGroupMessage', {
                    fromUserId,
                    message: savedMessage.message,
                    groupId,
                });
            });
        }

        // Respond to the client with the success message and the saved message data
        return res.status(200).json({
            message: 'Group message sent successfully',
            data: savedMessage,
        });
    } catch (error) {
        console.error('Error sending group message:', error);
        return res.status(500).json({
            message: 'Error sending group message',
            error: error.message,
        });
    }
};

// Helper function to retrieve all socket IDs for users in a group
// This is just an example, you should replace this with your actual implementation to fetch the group members' socket IDs
const getGroupSocketIds = (groupId) => {
    // Assume you store group members' socket IDs in an in-memory Map or a Redis database
    // This is just an example, replace with your actual implementation
    return groupSocketIdsMap.get(groupId) || [];
};
