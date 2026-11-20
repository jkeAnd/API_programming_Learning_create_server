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
    test('getToDoById should return undefined when incorrect id', () => {
        // usually should perhaps only get first x number of users so as to not crash computer
        
        const toDo = getToDoById('non-existing-id')
        assert.equal(toDo, undefined)})

    // VALID FORMAT checking
    test('valid format check for todoitem with title',() => {
        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            "state": "todo"

    }
    assert.equal(formatCheck(newToDo), true);
})
    // VALID FORMAT checking default state to todo
    test('valid format check for default todo state',() => {
        const newToDo = {
            
            "title": "Finnish weekly assignment",
            "description": "The current assignment is nr 4",
            

    }
    assert.equal(formatCheck(newToDo), true);
})


    //INVALID FORMAT checking

    //Invalid title format . Title must === string 
    test('formatCheck throws an error when title is not a string', () => {

        const newToDo = {

            title: 12345,
            description: "The title is an integer not a string ",
            state: "todo"
        };

        assert.throws(() => formatCheck(newToDo), {message: 'Title must be a string'});
    })

    //Invalid title - empty
    test('formatCheck throws an error when title is empty', () => {

        const newToDo = {

            title: '',
            description: "The title is empty ",
            state: "todo"
        };

        assert.throws(() => formatCheck(newToDo), {message: 'Title can not be an empty string'});
    })

    //missing title -> throws error -> should pass if error is handled correctly and message correct 
    test('Invalid format using formatCheck to check for missing title',() => {
        const newToDo = {
            
            
            "description": "The title is missing",
            "state": "todo"};
            
    assert.throws(() => formatCheck(newToDo), {message: 'Title is mandatory'});
})

    //Incorrect state -> throws error -> should pass if error is handled correctly and message correct 
    test('Invalid state check',() => {
        const newToDo = {
            
            title: "Testing state",
            description: "The current assignment is nr 4",
            state: "thinking about doing it"};
            
    assert.throws(() => formatCheck(newToDo), {message: 'INVALID STATE: must be todo, doing or done'});
})
    //checking whether can add new toDo:  -> should pass when length is length +1 
    test('addNewToDo adds successfully new todo', () => {
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
    // checking that addNewToDo throws error when handling Invalid type -> missing or empty title 
    test('addNewToDo throws error when adding without title for todo', () => {
        //
        const newToDo = {
            
            
            "description": "Missing title for todo",
            "state": "todo"
        };
        assert.throws(() => {
        addNewToDo(newToDo,toDos);
        },
        {message: 'Title is mandatory'}
    );
    });

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
        
        updateToDO(newToDO, {state: 'done'});

        assert.deepStrictEqual(newToDO.state, 'done');
    });

});


