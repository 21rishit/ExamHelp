import mongoose from "mongoose";

const phoneRegex = /^[0-9]{10}$/; // Ensures exactly 10 digits

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    college: { type: String, required: true },
    profileImage: { type: String, default: "" },
    password: { type: String, required: true },
    token: { type: String },
    phone: {
      type: String,
      match: [phoneRegex, "Phone number must be exactly 10 digits."],
      required: true,
    },
    contributions: {
      notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
      books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
      pyqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "PYQ" }],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
