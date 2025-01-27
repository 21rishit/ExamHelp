import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { createBooks, fetchAllBooks } from "../controllers/booksController.js";

const booksRouter = express.Router();

booksRouter.post("/upload", upload.single("file"), createBooks);
booksRouter.get("/", fetchAllBooks);

export default booksRouter;
