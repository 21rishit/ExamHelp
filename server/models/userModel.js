import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
//   collegeName: { 
//     type: String, 
//     required: true 
// },
//   profileImage: { 
//     type: String 
// },
// token:{
//   type:String
// },

  // collegeName, profileImage, fullName, email, password, 
});

const User = mongoose.model("User", userSchema);

export default User;
