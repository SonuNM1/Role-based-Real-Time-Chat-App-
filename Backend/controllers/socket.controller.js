import Message from '../models/message.model.js' ;

// handling all real-time communication 

// storing online users in-memory (in production, use Redis or DB)

const onlineUsers = new Map() ; 

export const handleSocketEvents = (io, socket) => {

    // when user joins (we store their socket ID with their user ID)

    socket.io('join', ({userId}) => {
        onlineUsers.set(userId, socket.id) ; 

        console.log(`User: ${userId} joined with socket ID: ${socket.id}`)
    })

    // Private message handling 

    socket.io('privateMessage', async ({toUserId, fromUserId, message}) => {

        // saving message to db 

        await Message.create({
            from: fromUserId, 
            to: toUserId,
            message, 
            type: 'private'
        })

        const recipientSocketId = onlineUsers.get(toUserId)

        if(recipientSocketId){
            io.to(recipientSocketId).emit('receivePrivateMessage', {
                fromUserId, 
                message 
            })
        }
    })

    // join group 

    socket.io('joinGroup', ({groupId}) => {
        socket.join(groupId) ; 

        console.log(`Socket: ${socket.id} joined group: ${groupId}`)
    })

    // send group message 

    socket.io('groupMessage', async ({groupId, fromUserId, message}) => {
        // saving group message to db
        
        await Message.create({
            from: fromUserId, 
            groupId, 
            message, 
            type: 'group'
        })

        io.to(groupId).emit('receiveGroupMessage', {
            fromUserId, 
            message, 
            groupId
        })

    })

    // Leave group 

    socket.io('leaveGroup', ({groupId}) => {
        socket.leave(groupId) ; 

        console.log(`Socket: ${socket.id} left group: ${groupId}`)
    })

}