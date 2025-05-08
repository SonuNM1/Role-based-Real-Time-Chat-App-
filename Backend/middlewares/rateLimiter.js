import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 5, // limit to 5 requests per window
    message: {
        message: 'Too many login attempts. Please try again after 15 minutes.'
    }, 
    standardHeaders: true, 
    legacyHeaders: false 
})

// To protect all API routes 

export const globalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per window 
})


