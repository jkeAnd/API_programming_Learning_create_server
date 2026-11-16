import {describe, test, beforeEach, afterEach} from "node:test"
import request from "supertest"
import app from "../src/app.js"
import assert from "node:assert/strict"
import { toDos } from "../src/services/todos.js"
import { v4 as uuidv4} from 'uuid';

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
});

    test('responds with 404 for non-existin toDo item', async () => {
        await request(app)
        .get('/toDos/99999')
        .expect(404)
    });




// POST new toDO
//----------------------
//Delete toDo by id
//----------------------
// 
//----------------------
//
//----------------------
// //----------------------
//
//----------------------
// 
//----------------------
//
//----------------------