import { config } from '../config/config';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';


//Global error handler
// it should be at the end of all the routes
// app.use();
const globalErrorHandler = (err:HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === "development" ? err.stack : "", //it exposes the data of your server
    });
};

export default globalErrorHandler;