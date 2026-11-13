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
//-----GET BY ID---------------------

router.get('/', (req, res) => {
    res.json(toDos);
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const toDo = getToDoById.find( u => u.id === id)
    if (!toDo) return res.status(404).json({ error: 'toDo Item not found.'})
        return res.json(toDo)
})
//-------------------------------

//--GET ALL

//------POST----------------------
router.post('/', (req, res) => {
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
return res.status(201).json(newToDo)
})
//-------------
// PUT Function


router.put('/:id', (req, res)=>{
    const{id} = req.params
    const updates =req.body

    //Finding the todo item
    const toDo = toDos.find(anItem => anItem.id === id)

    if(!toDo) {
        return res.status(404).json({
            error:'ToDoNot found'
        })
    }

    //Update all the fields in the request body 
    Object.assign(toDo, updates)

    //Then Return the updated toDo item 
    return res.json(toDo)

})


export default router;