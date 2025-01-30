import { PYQs } from "../models/pyqsModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/userModel.js";

const createPYQs = async (req, res) => {
  try {
    
    // Destructuring
    const { courseTitle, courseCode, facultyName, term, academicYear, contributor } =
      req.body;

    if (!courseTitle || !courseCode || !facultyName || !term || !academicYear) {
      return res.status(400).send({ message: "one or more fields missing!" });
    }
    console.log(req.body)
    // Upload the new PYQs file to Cloudinary
    const file = req.file;
    console.log(file);
    const fileUpload = await uploadOnCloudinary(file.path);
    const url = fileUpload?.url || "";

    console.log(url);

    const newPYQs = {
      courseTitle: courseTitle,
      courseCode: courseCode,
      facultyName: facultyName,
      term: term,
      academicYear: academicYear,
      link: url,
      contributor: contributor, 
    };

    const pyq = await PYQs.create(newPYQs);
    console.log(pyq);
    const user = await User.findById(contributor);
    console.log(user);
    user.contributions.pyqs.push(pyq._id);
    await user.save();
    return res.status(201).send(pyq);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const fetchAllPYQs = async (req, res) => {
  try {
    const allPYQs = await PYQs.find();
    console.log("PYQs fetched..");
    return res.status(200).send(allPYQs);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { createPYQs, fetchAllPYQs };
