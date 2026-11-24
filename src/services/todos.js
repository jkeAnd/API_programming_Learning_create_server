// will require npm install uuid

import {v4 as uuidv4} from 'uuid'

//Simulate the database here - FOR JAKE --see material notes for example
//NOTE MANY VARIABLES
export const toDos = [
    {id: uuidv4(), title: 'Study REST APIs', description: 'Read a dissertation by Roy Fielding ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()},
    {id: uuidv4(), title: 'Find some literature on express', description: 'etc ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()},


];

//FUNCTIONS


// check format - returns true if format correct else flags error 
export function formatCheck(todo){
//Todo must have title
    if (todo.title === undefined) {
        throw new Error('Title is mandatory');
    }

    //Type of title must === string 
    if (typeof(todo.title) !== 'string') {
        throw new Error('Title must be a string')
    }
    //Todo must have title
    if (!todo.title.trim()) {
        throw new Error('Title can not be an empty string');
    }
    

    //Set default state
    if (!todo.state) {
        todo.state = 'todo'
    }
    //Valid states
    const allowedStates = ['todo', 'doing', 'done'];

    if (!allowedStates.includes(todo.state.toLowerCase())) {
        throw new Error(
            'INVALID STATE: must be todo, doing or done'
        );
    }
    return true;
}


// define methods and export 
export function getAllToDos(){
    return(toDos)
}

export function getToDoById(id){

    
    
    
    return toDos.find( anItem => anItem.id ===id)

}

//POST - new todo -with error handling
export function addNewToDo(newToDo, toDos){
    // ERROR HANDLING
    // title must be string
    // title must be included
    formatCheck(newToDo);
    
    toDos.push(newToDo);
    
}


// create a function that finds index and deletes occurence 
export function deleteToDo(id) {
    const index = toDos.findIndex(

        item => item.id ===id
    );
    if (index ===-1) {
        return null;
    }
    // splice removes and returns value 
    return toDos.splice(index, 1);
}

//PUT update to toDo by id
export function updateToDo( toDo, updates){
    Object.assign(toDo, updates);

    toDo.modifiedAt = Date.now();
}
