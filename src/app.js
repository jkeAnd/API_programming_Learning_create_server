import express from 'express';

import indexRouter from './routes/index.js';
import todosRouter from './routes/todos.js';

//Assignment 6 documentation
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// LOAD YAML
const swaggerDocument = YAML.load('./src/docs/openapi.yaml');
const app = express();

//documentation roure
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//support for json
app.use(express.json())


//define  handlers for routes
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/todos', todosRouter);

//export the app to server.js where this is refered to 
export default app;