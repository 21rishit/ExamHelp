import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import { upload } from "../middlewares/multerMiddleware.js"; // Import multer middleware
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Notes} from "../models/notesModel.js";
import {Books} from "../models/booksModel.js"; 
import {PYQs} from "../models/pyqsModel.js";

dotenv.config();

export const checkAvailability = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: "Please provide username or email." });
    }

    // Check if username or email exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username or email already in use." });
    }

    res.status(200).json({ available: true, message: "Username and email are available." });
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  upload.single("profileImage")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { username, email, phone, name, college, password, confirmPassword } = req.body;
    let profileImage = "";

    try {
      // Validate input
      if (!username || !email || !phone || !name || !college || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      // Check if username or email already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: "Email or username already in use." });
      }

      // If a profile image is uploaded, store it in Cloudinary
      if (req.file) {
        const dp = await uploadOnCloudinary(req.file.path);
        if (dp) {
          profileImage = dp.secure_url; // Store only the secure URL
        } else {
          return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        }
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const newUser = new User({
        username,
        email,
        phone,
        name,
        college,
        profileImage, // Save Cloudinary URL
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "Error registering user.", error: err });
    }
  });
};

// Get user profile (excluding sensitive data)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user details (exclude password & token for security)
    const user = await User.findById(userId)
      .select("-password -token")
      .lean(); // Optimize for performance

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user contributions (Books, Notes, PYQs)
export const getUserContributions = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch contributions, limiting unnecessary fields
    const books = await Books.find({ contributor: id }).select("title author publishYear subject link createdAt").lean();
    const notes = await Notes.find({ contributor: id }).select("courseTitle courseCode facultyName term link year createdAt").lean();
    const pyqs = await PYQs.find({ contributor: id }).select("courseTitle courseCode facultyName term link academicYear createdAt").lean();

    // Combine all contributions
    const contributions = [...books, ...notes, ...pyqs];

    res.status(200).json(contributions);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({ message: "Error fetching contributions", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("Login successful!", user._id);
    res.json({ message: "Login successful!", token, username: user.username, userId: user._id });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in.", error: err });
  }
};
