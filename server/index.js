import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"

dotenv.config();// Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend
// CORS - Cross Origin Resource Sharing

// Test route
app.get("/", (req, res) => {
  return res.status(200).send("Home page GET route hit");
});

// Routes 
import booksRouter from "./routes/booksRouter.js";
import notesRouter from "./routes/notesRouter.js";
import pyqsRouter from "./routes/pyqsRouter.js";
import authRouter from "./routes/authRouter.js"; // Authentication routes
import protectedRouter from "./routes/protectedRouter.js"; // Protected routes

// Register Routes
app.use("/auth", authRouter); // Auth routes (login, register)
app.use("/protected", protectedRouter); // Protected routes
app.use("/books", booksRouter);
app.use("/notes", notesRouter);
app.use("/pyqs", pyqsRouter);


// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("connected to database");
//     app.listen(PORT, () => {
//       console.log("server running on port: ", PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("error connecting to db");
//   });

// MongoDB Connection
const connectDB = async () => {
  try {
    // const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/test');
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    console.log("MONGODB Connected...");
  } catch (error) {
      console.error("MONGODB connection FAILED ");
      console.error(error.message);
      process.exit(1);
  }
};

// Start the Server
connectDB()
  .then(() => {
      app.listen(process.env.PORT || 3000, () => {
          console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
      });
  })
  .catch((err) => {
      console.error("MONGO db connection failed !!! ", err);
  });



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose"; // Removed `{ mongoose }`, it's redundant.
// import { v2 as cloudinary } from "cloudinary";
// import authRouter from "./routes/authRouter.js"; // Authentication routes
// import booksRouter from "./routes/booksRouter.js"; // Books routes
// import notesRouter from "./routes/notesRouter.js"; // Notes routes
// import pyqsRouter from "./routes/pyqsRouter.js"; // PYQs routes
// import protectedRouter from "./routes/protectedRouter.js"; // Protected routes

// dotenv.config(); // Load environment variables

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Initialize Express App
// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from frontend

// // Test route
// app.get("/", (req, res) => {
//   res.status(200).send("Home page GET route hit");
// });

// // Register Routes
// app.use("/auth", authRouter); // Auth routes (login, register)
// app.use("/protected", protectedRouter); // Protected routes
// app.use("/books", booksRouter); // Books routes
// app.use("/notes", notesRouter); // Notes routes
// app.use("/pyqs", pyqsRouter); // PYQs routes

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//   } catch (error) {
//     console.error("MONGODB connection FAILED");
//     console.error(error.message);
//     process.exit(1); // Exit the process if the database connection fails
//   }
// };

// // Start the Server
// connectDB()
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`⚙️  Server is running at port: ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MONGO DB connection failed !!!", err);
//   });
