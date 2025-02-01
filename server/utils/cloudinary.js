import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promise-based fs for async operations

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("❌ No file path provided for Cloudinary upload.");
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    //   folder: "examhelp_uploads", // Organize uploads in a folder (optional)
    });

    console.log("✅ File uploaded to Cloudinary:", response.secure_url);

    // Remove the local file after successful upload
    await fs.unlink(localFilePath);
    
    return response; // Return only the URL for simplicity    
    // why why why response.secure_url
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    // Ensure the local file is deleted even if upload fails
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("⚠️ Error deleting temp file:", unlinkError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };
