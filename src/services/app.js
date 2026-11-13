import express from 'express';

import indexRouter from '../routes/index.js';
import usersRouter from '../routes/users.js';

const app = express();

//support for json
app.use(express.json())


//define  handlers for routes
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//export the app to server.js where this is refered to 
export default app;