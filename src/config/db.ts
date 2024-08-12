// import mongoose from "mongoose";
// import { config } from "./config";


// const connectDB = async () => {
//     try {
        
//         mongoose.connection.on("connceted", () => {
//             console.log("Connected to database successfully");            
//         });
        
//         mongoose.connection.on('error', (err) => {
//             console.log('Error in connceting to databse.', err);
            
//         })
        
//         await mongoose.connect(config.databaseUrl as string);
//         // await mongoose.connect(`mongodb+srv://buzzerbreaker909:${process.env.MONGOPASSWORD}@elib.0qwo3jl.mongodb.net/`);

//     } catch (err) {
//         console.error("Failed to conect to database.", err);
//         process.exit(1);
//     }
// }

// export default connectDB;
