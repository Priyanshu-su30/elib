import express from 'express';

const app = express();
// Routes
// Http methods GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
    res.json({message: "Welcome to elib apis"}); //here the "res" i.e resposne is used to seb=nd message to client
})

export default app;