import express from "express";
import { registerUser, loginUser, checkAvailability } from "../controllers/authController.js";
import { getUserProfile, getUserContributions } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/check-availability", checkAvailability);

// Register route
authRouter.post("/register", registerUser);

// Login route
authRouter.post("/login", loginUser);

// Get user profile route
authRouter.get("/profile/:id", authMiddleware, getUserProfile); // Protected route

// Get user contributions route
authRouter.get("/contributions/:id", authMiddleware, getUserContributions);


export default authRouter;
