import express from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';

const app = express();
// Routes
// Http methods GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
    return res.json({message: "Welcome to elib apis"}); //here the "res" i.e resposne is used to seb=nd message to client
});


app.use(globalErrorHandler);

export default app;