// will require npm install uuid

import {v4 as uuidv4} from 'uuid'

//Simulate the database here - FOR JAKE --see material notes for example
//NOTE MANY VARIABLES
const toDos = [
    {id: uuidv4(), title: 'Study REST APIs', description: 'Read a dissertation by Roy Fielding ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()}

]


// define methods and export 
export function getAllToDos(){
    return(toDos)
}

export function getToDoById(id){
    return toDos.find( anItem => anItem.id ===id)
}