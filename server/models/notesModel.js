import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    contributor: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User", // Links to the User collection
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    facultyName: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("Notes", notesSchema);
