import { Books } from "../models/booksModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/userModel.js";

const createBooks = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);


    // Destructuring
    const { title, author, publishYear, subject,contributor} = req.body;
    // const contributor = req.user._id;

    if (!title || !author || !publishYear || !subject) {
      return res.status(400).send({ message: "one or more fields missing!" });
    }

    // Upload the new book file to Cloudinary
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: "File is required!" });
    }

    // Upload the new notes file to Cloudinary
    console.log(file);
    const fileUpload = await uploadOnCloudinary(file.path);
    const url = fileUpload?.secure_url || "";

    console.log(url);

    const newBooks = {
      title: title,
      author: author,
      publishYear: publishYear,
      subject: subject,
      link: url,
      contributor,
    };

    const book = await Books.create(newBooks);
    console.log(book);
    const user = await User.findById(contributor);
    console.log(user);
    user.contributions.books.push(book._id);
    await user.save();
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const fetchAllBooks = async (req, res) => {
  try {
    const allBooks = await Books.find();
    console.log("Books fetched..");
    return res.status(200).send(allBooks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export { createBooks, fetchAllBooks };
