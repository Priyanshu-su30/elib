import express from 'express';
import globalErrorHandler from './middleware/globalErrorHandler';
import userRouter from './user/userRoutes';
import bookRouter from './book/bookRouter';

const app = express();
app.use(express.json());

//Database call

// Routes
// Http methods GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
    return res.json({message: "Welcome to elib apis"}); //here the "res" i.e resposne is used to seb=nd message to client
});


app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);



app.use(globalErrorHandler);

export default app;