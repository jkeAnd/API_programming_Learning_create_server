import express from 'express';
//REMEMBER -> requires npm install uuid
import {v4 as uuidv4} from 'uuid';
//import handlers 
import { 
    getAllUsers,
    getUserById
} from '../services/users.js'

const router = express.Router();



router.get('/', (req, res) => {
    res.json(users);
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find( u => u.id === id)
    if (!user) return res.status(404).json({ error: 'User not found.'})
        return res.json(user)
})

export default router;