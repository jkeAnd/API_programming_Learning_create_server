import express from 'express';
//REMEMBER -> requires npm install uuid
import {v4 as uuidv4} from 'uuid';
//import handlers 
import { 
    getAllToDos,
    getToDoById,
    deleteToDo,
    toDos,
    addNewToDo,
    updateToDO,
    formatCheck
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
    return res.status(200).json(toDo);
});
//-------------------------------

// -----GET BY state-----
router.get('/', (req, res) => {
    const state = req.query.state
    if (typeof state === 'string') {
        const result = toDos.filter(atodo => atodo.state === state)
        return res.status(200).json(result)
    }
    res.json( toDos)
});


//------POST----------------------
router.post('/', (req, res) => {
//Assuming input correctly formater 
// Still needed-> ADD VALIDATION 
// if the title incorrect respond with 400
const {title, description, state} = req.body 

//---------NEW Todo---------------
try {
    // HAD issues with trimming missing title -> moved format check first 
    formatCheck(req.body);
const now = Date()
const newToDo = {
    id:uuidv4(),
    title: title.trim(),
    description: description,
    state: state,
    createdAt: now,
    modifiedAT: now
};
// using error handling function

    

    addNewToDo(newToDo, toDos);

    return res.status(201).json(newToDo);
}
catch (error) {
    return res.status(400).json({
        error: error.message 
    });
}
    
});


//-------------
// PUT 



router.put('/:id', (req, res)=>{
    const id = req.params.id;
    //USE FUNCTION CALL FOR ID (OBSOLETE?)
    const toDO = getToDoById(id);
    const updates =req.body;


    if(!toDO) {
        return res.status(404).json({
            error:'ToDoNot found'
        });
    }

    //Format check implementation added by copying ...updates and checking format 
    try {
        const updatedTodo = {
            ...toDO,
            ...updates

        };
        //what will be added needs to be checked
    formatCheck(updatedTodo);

    updateToDO(toDO, updates);
    //Update all the fields in the request body if acceptable
    

    //Then Return the updated toDo item 
    return res.json(toDO)
    }
    catch(error) {
        return res.status(400).json({
            //will return actual error messae from function 
            error: error.message
        });
    }

})
//--------------DELETE-(BY id)-----


router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    //USE FUNCTION CALL FOR ID 
    const deletetoDO = deleteToDo(id);
    const updates =req.body;


    if(!deletetoDO) {
        return res.status(404).json({
            error:'Can not delete: ToDoNot found'
        });
    }

    return res.json(deleteToDo);

})


export default router;