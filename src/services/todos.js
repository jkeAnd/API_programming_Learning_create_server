// will require npm install uuid

import {v4 as uuidv4} from 'uuid'

//Simulate the database here - FOR JAKE --see material notes for example
//NOTE MANY VARIABLES
export const toDos = [
    {id: uuidv4(), title: 'Study REST APIs', description: 'Read a dissertation by Roy Fielding ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()},
    {id: uuidv4(), title: 'Find some literature on express', description: 'etc ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()},


];

//FUNCTIONS
// define methods and export 
export function getAllToDos(){
    return(toDos)
}

export function getToDoById(id){

    // FOR LATER ERROR HANDLING HEREi
    
    
    return toDos.find( anItem => anItem.id ===id)

}

//POST - new todo -with error handling
export function addNewToDo(newToDo, toDos){
    toDos.push(newToDo)
    
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


