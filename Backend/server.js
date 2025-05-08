// server.js

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'

import conn from './config/dbConnection.js'
import { initSocketServer } from './config/socket.js'
import { logger } from './utils/logger.js'
import { globalLimiter } from './middlewares/rateLimiter.js'
import { seedAdmin } from './seed/adminSeeder.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/admin.routes.js'
import { setupSwaggerDocs } from './docs/swagger.js'
import messageRoute from './routes/message.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Create HTTP server from Express app
const server = http.createServer(app)

// ✅ Initialize WebSocket server with same HTTP server
initSocketServer(server)

// ================== MIDDLEWARES ==================

app.use(cors({
    origin: 'http://localhost:5000', 
    credentials: true,
  }));
app.use(express.urlencoded({ extended: true }))  
app.use(express.json())
app.use(globalLimiter)

// ✅ Logger middleware to log all incoming requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`)
    next()
})

// ================== ROUTES ==================

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/message', messageRoute)

// ================== SWAGGER ==================

setupSwaggerDocs(app)

// ================== START SERVER ==================

conn.then(async () => {
    await seedAdmin()

    server.listen(PORT, () => {
        logger.info(`🚀 Server running on http://localhost:${PORT}`)
        logger.info(`📄 Swagger docs: http://localhost:${PORT}/api/docs/user`)
    })

}).catch((err) => {
    logger.error('❌ DB Connection failed:', err)
})
