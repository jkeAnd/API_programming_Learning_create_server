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

// ----GET--ALL----------
router.get('/', (req,res) =>{
    const toDos = getAllToDos();

    return res.json(toDos);
});
//-----GET BY ID---------------------

router.get('/:id', (req, res) => {
    const id = req.params.id
    const toDo = getToDoById(id);

    if(!toDo) {
        return res.status(404).json({
            error: 'ToDO Item not found'
        });
    }
    return res.json(toDo);
});
//-------------------------------



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
});


//-------------
// PUT 



router.put('/:id', (req, res)=>{
    const id = req.params.id;
    //USE FUNCTION CALL FOR ID 
    const toDO = getToDoById(id);
    const updates =req.body;


    if(!toDO) {
        return res.status(404).json({
            error:'ToDoNot found'
        })
    }

    //Update all the fields in the request body 
    Object.assign(toDO, updates)

    //Then Return the updated toDo item 
    return res.json(toDO)

})


export default router;