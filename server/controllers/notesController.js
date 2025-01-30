import { Notes } from "../models/notesModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/userModel.js";

const createNotes = async (req, res) => {
    try {
      console.log("req.file:", req.file);
      console.log("req.body:", req.body);
        
        // Destructuring
        const {contributor, courseTitle, courseCode, facultyName, year } = req.body

        if (!courseTitle || !courseCode || !facultyName || !year ) {
            return res.status(400).send({ message: "one or more fields missing!" });
        }

        // Upload the new notes file to Cloudinary
        const file = req.file;
        if(!file) {
            return res.status(400).send({ message: "File is required!" });
        }

        // Upload the new notes file to Cloudinary
        console.log(file);
        const fileUpload = await uploadOnCloudinary(file.path);
        const url = fileUpload.url;

        console.log(url);

        const newNotes = {
            contributor,
            courseTitle: courseTitle,
            courseCode: courseCode,
            facultyName: facultyName,
            year: year,
            link: url,
        };

        const note = await Notes.create(newNotes);
        console.log(note);
        const user = await User.findById(contributor);
        console.log(user);
        user.contributions.notes.push(note._id);
        await user.save();
        return res.status(201).send(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const fetchAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.find();
    console.log("Notes fetched..");
    return res.status(200).json(allNotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { createNotes, fetchAllNotes }
