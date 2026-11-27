------------------
TODO API version 1:
----------------

Using rest api to build with node.js and express to manage items in a todo list

Current features:
Get all toDo items
Get toDo item by id
Post create a new toDo item
Put update an existing toDo item 
delete by id an item

current progress:

I found it difficult to implement this task. 
Lack of experience and knowledge lead me to focus heavily on the examples given in class, whilst forgetting to use function calls for functions created 

Routes and services was difficlut do navigate and understand

Testing is still vague. I ran test using browser . Yet to implement any test cases in vs code .


------------------
TODO API version 2:
-----------------
Refactoring:

Most business logic was already introduced in version 1, however more error handling was added. 
Routes folder is responsible for handling the http requests and responses.
Services foler contains the actual todo management functions. Current functions are:
        -create, update, delete, and validate

this seperation allowed for unit tests and integration tests


TESTING:

API.test is an integration test that verifies api endpoints, the status codes and responses.

Unit test -> checks service functions with valid and invalid inputs.

-----------------
DEPENDANCIES
-----------------


"npm install express uuid" needed to run 

"npm start" will start the server 

"npm run dev" auto restarts on file change 

To run all tests: 
"npm install --save-dev supertest" 
"npm test"

To run integration tests:

"npm run test:api"

To Run Unit tests:

"npm run test:unit"

-----------------------
rate limiter
-----------------------
// Limiting the log in attempts to 5 per minute -> this prohibits most common brute force attacks 
"npm install express-rate-limit "