/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModels from "./userModels";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;
    
    //Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    //Database call
    try {
        const user = await userModels.findOne({ email });

        if(user){
            const error = createHttpError(400, "User already exist with this email.")
            return next(error);
        }
    } catch (err) {
        return next(createHttpError(500, "Error while getting user"));
    }

    //password->hash
    const hashedPassword = await bcrypt.hash(password,10);
    
    let newUser: User;
    try {
        newUser = await userModels.create({
            name,
            email,
            password: hashedPassword,
        });
        
    } catch (err) {
        return next(createHttpError(500, "Error while creating user."));
    }

    try {
        //Token generation JWT
        const token = sign({sub: newUser._id}, config.jwtSecret as string, {
            expiresIn: '7d',
            algorithm: "HS256",
        });
        
        //Response
        res.status(201).json({ accessToken: token});
    } catch (err) {
        return next(createHttpError(500, "Error while signing jwt token."))
    }
    

};


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body;

    if(!email || !password){
        return next(createHttpError(400, "All fields are required"));
    }

    const user = await userModels.findOne({email});
    try {
        if(!user){
            return next(createHttpError(400, "User not found."));
        }

    } catch (err) {
        return next(createHttpError(500, "Error while signing."));
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return next(createHttpError(400, "Username or password incorrect!"));
    }
    
    //Create accesstoken
    try {
        const token = sign({sub: user._id}, config.jwtSecret as string, {
            expiresIn: '7d',
            algorithm: "HS256",
        });
        
        res.json({ accessToken: token});        
    } catch (error) {
        return next(createHttpError(500, "Error while signing jwt token."));      
    }



}



export {createUser, loginUser};