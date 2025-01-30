import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import { createPYQs, fetchAllPYQs } from "../controllers/pyqsController.js";

const pyqsRouter = express.Router();

pyqsRouter.post("/upload", upload.single("file"), createPYQs);
pyqsRouter.get("/",fetchAllPYQs);

export default pyqsRouter;

// Router - url check, 
// controller consists of functions that are executed on hitting these routes
