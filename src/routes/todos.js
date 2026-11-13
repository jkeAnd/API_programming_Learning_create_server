import express from 'express';
//REMEMBER -> requires npm install uuid
import {v4 as uuidv4} from 'uuid';
//import handlers 
import { 
    getAllToDos,
    getToDoById
} from '../services/todos.js'

const router = express.Router();
//-----------------------------
//-----GET---------------------

router.get('/', (req, res) => {
    res.json(toDos);
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const toDo = toDo.find( u => u.id === id)
    if (!toDo) return res.status(404).json({ error: 'toDo Item not found.'})
        return res.json(toDo)
})
//-------------------------------
//------PUT----------------------
//Assuming input correctly formater 
const {title, description, state} = req.body 

//---------NEW Todo---------------
const newToDo = {
    id:uuidv4(),
    title: title,
    description: description,
    state: state,
    createdAt: Date.now(),
    modifiedAT: Date.now()
}
//-------------
// put Function

router.put('/:id', (req, res)=>{
    
})
export default router;