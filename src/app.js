import express from 'express';
import cookieParser from 'cookie-parser'
import {verifyToken} from './middleware/verifytoken.js'
import { loginLimiter, apiLimiter } from './middleware/rateLimiter.js';
import indexRouter from './routes/index.js';
import todosRouter from './routes/todos.js';
import authRouter from './routes/auth.js'

const app = express();

//Assignment 6 documentation
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// LOAD YAML
const swaggerDocument = YAML.load('./src/docs/openapi.yaml');


//documentation roure
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//support for json
app.use(express.json())
app.use(cookieParser())


//define  handlers for routes
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//ASSIGNMENT 7 Use limiters
app.use('/', indexRouter);
app.use('/auth', loginLimiter,authRouter);

app.use('/todos', verifyToken,apiLimiter, todosRouter);

//export the app to server.js where this is refered to 
export default app;