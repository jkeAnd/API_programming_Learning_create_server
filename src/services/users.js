// will require npm install uuid

import {v4 as uuidv4} from 'uuid'

//Simulate the database here - FOR JAKE --see material notes for example

const users = [
    {id: uuidv4(), name: 'Alice'},
    {id: uuidv4(), name: 'Bob'}

]
// define methods and export 
export function getAllUsers(){
    return(users)
}

export function getUserById(id){
    return users.find( anItem => anItem.id ===id)
}