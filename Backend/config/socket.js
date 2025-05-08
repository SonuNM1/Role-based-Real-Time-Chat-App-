import { Server } from "socket.io";
import {handleSocketEvents} from '../controllers/socket.controller.js'

export const initSocketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('New client connected: ', socket.id)

        // delegating event handlers to controller 

        handleSocketEvents(io, socket)

        socket.io('disconnect', () => {
            console.log('Client disconnected: ', socket.id)
        })

    })
}