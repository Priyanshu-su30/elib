import express from "express";
import { createBook, listBooks, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middleware/authenticate";

const bookRouter = express.Router();


const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: {fileSize: 3e7 } //30mb
})
//routes
// /api/books
bookRouter.post("/", 
    authenticate,
    upload.fields([
    {name: "coverImage", maxCount:1},
    {name: "file", maxCount:1},
]), createBook);

bookRouter.patch(
    "/:bookId",
    authenticate,
    upload.fields([
        {name: "coveImage", maxCount: 1},
        {name: "file", maxCount: 1},
    ]),
    updateBook
);

bookRouter.get("/", listBooks);

export default bookRouter;