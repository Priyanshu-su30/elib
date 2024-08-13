import mongoose from "mongoose";
import { config } from "./config";


const connectDB = async () => {
    try {
        
        mongoose.connection.on('connected', () => {
            console.log("Connected to database successfully");            
        });
        
        //if error comes in future
        mongoose.connection.on('error', (err) => {
            console.log('Error in connceting to databse.', err);
            
        })
        //here the ts is undefine so we use as string i.e ye aane hi wala h in future
        await mongoose.connect(config.databaseUrl as string);        
        
    } catch (err) {
        //for initial error
        console.error("Failed to conect to database.", err);
        process.exit(1);
    }
};

export default connectDB;