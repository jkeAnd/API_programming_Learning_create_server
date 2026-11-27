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
------------------
TODO API version 3:
-----------------
JWT Bearer authentication tokens
refresh token support
http refresh token cookies
protected Todo endpoints  with authentication and rate limiting 
----------------------
Authentication
----------------------
Users are authenticate through login endpoint.

Successful authentication returns:
access token (JWT)
Refresh token(stored in a http only cookie)

Protected Todo endpoints require:
An access token is required,
Authorization : Bearer <ACCESS_TOKEN>


Access tokens expire after 15minutes, 
refresher token expires after 7days 
Refresher tokens can be used to obtain a new access token without the user needing to login again.


-----------------------
rate limiter
-----------------------
// Limiting the log in attempts to 5 per minute -> this prohibits most common brute force attacks 
"npm install express-rate-limit "

api queries limited to 10 then must re authorize 

------------------------
Swagger/ OPENAPI -documentation was one of the most challenging parts of this assignment.



* Documenting the access tokens and the refresher tokens with openapi.

  "TestTom" and password "test" were used in openapi documentation as representative values, I also initially used example string values as examples in place of actual token values. My thinking and belief was that it would not be advisable to share the specific user or token information for security reasons. 

As the openAPi examples used are representative values and are not stored on server database actual authentication isn't possible withouth authenticated user data that is stored in the application. This ended up causing some initial confusion.
 To test the authentication workflow a valid user account stored by the application are needed when executing requests. Else Swagger executions return 401 unauthorized for all requests made. 



