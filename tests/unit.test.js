import {describe,test, todo} from "node:test";
import assert from "node:assert/strict";


import { 
       
    getAllToDos,
    getToDoById,
    deleteToDo,
    toDos,
    addNewToDo,
    updateToDO,
    formatCheck
    
} from '../src/services/todos.js';

// describe all todos:



describe('Todo Service Tests', () =>{
    //checking whether exists task by title: 'Study REST APIs' -> should return pass
    test('getAllToDos should return an array of all todo tasks', () => {
        const toDos = getAllToDos();
        assert.ok(toDos.some(todo => todo.title === 'Study REST APIs'))
    })
    //checking whether exists task by id:  -> should pass
    test('getToDoById should find user by ID', () => {
        // usually should perhaps only get first x number of users so as to not crash computer
        const toDos = getAllToDos()
        const toDo = getToDoById(toDos[0].id)
        assert.deepStrictEqual(toDo, toDos[0])
    })
    //Undefined Invalid todoid
    test('getToDoById should return undefined', () => {
        // usually should perhaps only get first x number of users so as to not crash computer
        
        const toDo = getToDoById('non-existing-id')
        assert.equal(toDo, undefined)})

    // VALID FORMAT checking
    test('valid format check',() => {
        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            "state": "todo"

    }
    assert.equal(formatCheck(newToDo), true);
})
    // VALID FORMAT checking default state to todo
    test('valid format check',() => {
        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            

    }
    assert.equal(formatCheck(newToDo), true);
})


    //INVALID FORMAT checking

    //missing title -> throws error -> should pass if error is handled correctly and message correct 
    test('valid format check',() => {
        const newToDo = {
            
            
            "description": "The current assignment is nr 4",
            "state": "todo"};
            
    assert.throws(() => formatCheck(newToDo), {message: 'Title is mandatory'});
})

    //Incorrect state -> throws error -> should pass if error is handled correctly and message correct 
    test('valid format check',() => {
        const newToDo = {
            
            title: "Testing state",
            description: "The current assignment is nr 4",
            state: "thinking about doing it"};
            
    assert.throws(() => formatCheck(newToDo), {message: 'INVALID STATE: must be todo, doing or done'});
})
    //checking whether can add new toDo:  -> should pass when length is length +1 
    test('addNewToDo adds a new todo', () => {
        //
        const lengthBefore = toDos.length;

        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            "state": "todo"
        }
        addNewToDo(newToDo,toDos);
        assert.equal(toDos.length, lengthBefore +1);
    })
    // Invalin type missing or empty title 
    test('addNewToDo adds a new todo', () => {
        //
        const lengthBefore = toDos.length;

        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            "state": "todo"
        }
        addNewToDo(newToDo,toDos);
        assert.equal(toDos.length, lengthBefore +1);
    })

    //Checking whether deleting a toDO removes -> should pass
    test('deleteToDo removes a todo correctly', () => {
        //remove first element from todos 
        const id = toDos[0].id;
        deleteToDo(id);

        assert.deepStrictEqual(getToDoById(id), undefined);
    });

    //Put by id- testing whether status to new todo is updated correctly -> should pass
    
    test('updateToDo updates status correctly', () => {
        const newToDO = {
            title: 'Test Todo',
            description: 'Test',
            state: 'todo'};

        
        addNewToDo(newToDO, toDos)
        
        updateToDO(newToDO, {state: 'Done'});

        assert.deepStrictEqual(newToDO.state, 'Done');
    });

});


