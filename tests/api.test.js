import {describe, test, beforeEach, afterEach} from "node:test"
import request from "supertest"
import app from "../src/app.js"
import assert from "node:assert/strict"
import { toDos } from "../src/services/todos.js"
import { v4 as uuidv4} from 'uuid';
import { response } from "express"

//------------------
//Test set up before / after 
//---------------------------

beforeEach(() => {

    //reset and setup code before each test back to initial 

    toDos.length = 0;

    toDos.push(
        {
        id: uuidv4(), title: 'Study REST APIs', description: 'Read a dissertation by Roy Fielding ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()},
        {id: uuidv4(), title: 'Find some literature on express', description: 'etc ', state: 'todo', createrAt: Date.now(), modifiedAt: Date.now()}
        
    );
});


afterEach(() => {
    console.log('Test completed')
});


//----------------------
// GET all toDos 
//----------------------
describe('Get /toDos', () => {
    test('resonds with 200 and Json', async () => {
        const res = await request(app)
        .get('/toDos')
        .expect('Content-Type', /json/i)
        .expect(200)
        assert.ok(Array.isArray(res.body));
    });
});
//----------------------
// GET by id
//----------------------
describe('GET /toDos/:id', () => {
    test('responds with 200 and the todo object for existing todo task', async () => {
        const response = await request(app)
        .get('/toDos')
        .expect(200);
        const testApi = response.body.find(toDo => toDo.title === 'Study REST APIs');

        assert(testApi, 'Test Api Study REST APIs should exist in the toDo list');

        const res = await request(app)
        .get(`/toDos/${testApi.id}`)
        .expect(200)
        assert.deepStrictEqual(res.body, testApi)
    });


    test('responds with 404 for non-existin toDo item', async () => {
        await request(app)
        .get('/toDos/99999')
        .expect(404)
    });
    });




// POST new toDO
//----------------------
describe('POST /toDos', () => {
    test('Creating a new toDo item', async () => {
        const newTestItem = {
            title: 'Integration test todo',
            description: 'This is a test item to see whethere Post works',
            state:'todo'
        };

        const res = await request(app)
        .post('/toDos')
        .send(newTestItem)
        .expect('Content-Type', /json/i)
        .expect(201);
    
        assert.deepStrictEqual( res.body.title, newTestItem.title);
    
        assert.deepStrictEqual( res.body.state, newTestItem.state);
    
    });


    //INVALID INPUTS:

    test('returns 400 when state is invalid', async () => {

        await request(app)
        .post('/toDos')
        .send({
            title: '#2nd POST Integration test todo',
            description: 'This is a test item to see whethere Post works',
            state:'NOT ALLOWED'
        })
        .expect(400);
    });

    //WITHOUT TITLE 
    test('returns 400 when title of todo item is missing', async () => {
        const newItem2 = {
            description: 'This is a test item with no title',
            state:'todo'
        }
        await request(app)
        .post('/toDos')
        .send(newItem2 )
        .expect(400);
    });
});


//---------------------
//PUT toDO by id
//---------------------
describe('PUT /todos/:id', () => {
    //Valid id input + valid state 
    test('Updates todo status correctly', async () => {

        const response = await request(app)
        .get('/toDos')
        .expect(200);

        const toDo = response.body[0];

        const res = await request(app)
        .put(`/toDos/${toDo.id}`)
        .send({state: 'doing'})

        .expect(200);

        assert.equal(res.body.state, 'doing');
    });
    //Invalid id input
    test('returns 404 for non-existing id', async () => {
        await request(app)
        .put('/toDos/not-a-real-id')
        .send({ state: 'doing'})
        .expect(404); 

    })
    //Invalid state/input
    test('returns 400 for invalid input', async () => {
        const response = await request(app)
        .get('/toDos')
        .expect(200);

        const toDo = response.body[0];

        const res = await request(app)
        .put(`/toDos/${toDo.id}`)
        .send({state: 'thinking about doing'})

        .expect(400);
    });

});
//----------------------
// Delete toDo by id
//----------------------
describe('DELETE /todos/:id', () => {

    test('deletes exsiting ', async () => {

        const response = await request(app)
        .get('/toDos')
        .expect(200);

        const tuDo  = response.body[0];

        await request(app)
        .delete(`/toDos/${tuDo.id}`)
        .expect(200);
    });

    test('return 404 for invalid id', async () => {
        await request(app)
        .delete('/toDos/not-a-real-id')
        .expect(404); 
    });
});