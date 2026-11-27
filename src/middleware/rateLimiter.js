import {rateLimit}from 'express-rate-limit'
//Limiting number of login attempts to 5 attempt/  per min 
//default Ip.based limiting(auth)

export const loginLimiter = rateLimit({
    //starts counting 1minute 
    windowMs: + 60 * 1000,
    //Allow only 5 
    limit: 5,
    standardHeaders: 'draft-6',
    legacyHeaders: false,

    //Responds with message 
    message: {
        error: 'Too many requests made. Try later'
    }
})

export const apiLimiter = rateLimit({
    windowMs: + 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-6',
    legacyHeaders: false,
    //Used to count via user instead of IP as in above implementation 
    keyGenerator: (req) => req.user,

    message: {
        error: 'Too many requests made. Try again later.'
    }
})