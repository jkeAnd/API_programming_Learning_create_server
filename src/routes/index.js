import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        version: '1.0'
    });
});

export default router;