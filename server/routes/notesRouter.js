import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { createNotes, fetchAllNotes } from "../controllers/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/upload", upload.single("file"), createNotes);
notesRouter.get("/", fetchAllNotes)

export default notesRouter;