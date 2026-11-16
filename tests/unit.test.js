import {describe,test, todo} from "node:test";
import assert from "node:assert/strict";


import { 
       
    getAllToDos,
    getToDoById,
    deleteToDo,
    toDos,
    addNewToDo
    
} from '../src/services/todos.js';

// describe all todos:



describe('Todo Service Tests', () =>{
    //checking whether exists task by title: 'Study REST APIs' -> should return pass
    test('getAllToDos should return an array of all todo tasks', () => {
        const toDos = getAllToDos();
        assert.ok(toDos.some(todo => todo.title === 'Study REST APIs'))
    })
    //checking whether exists task by id:  -> should pass
    test('getToDoById should should find user by ID', () => {
        // usually should perhaps only get first x number of users so as to not crash computer
        const toDos = getAllToDos()
        const toDo = getToDoById(toDos[0].id)
        assert.deepStrictEqual(toDo, toDos[0])
    })

    //checking whether can add new toDo:  -> should pass when length is length +1 
    test('addNewToDo adds a new todo', () => {
        //
        const lengthBefore = toDos.length;

        addNewToDo({
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            "state": "todo"
        });
        assert.equal(toDos.length, lengthBefore +1);

{
    
}
    })

})
