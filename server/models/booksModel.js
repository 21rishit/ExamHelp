import mongoose from "mongoose";

const booksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    contributor: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User", // This should match your User model name
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Books = mongoose.model("Books", booksSchema);
