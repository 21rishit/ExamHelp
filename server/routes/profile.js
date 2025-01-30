import User from "../models/userModel.js"; // Adjust the import as per your file structure
import asyncHandler from "express-async-handler"; // To handle async errors properly

// @desc Get profile of the logged-in user
// @route GET /profile
// @access Private (auth middleware should be used)
export const getProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user.id` comes from the authentication middleware (e.g., JWT)

    // Fetch user details from DB using the userId
    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
