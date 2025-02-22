import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minLength: 4,
    maxLength: 18,
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    trim: true,
    minLength: 4,
    maxLength: 255,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
  },
  password:{
    type: String,
    minLength:4,
    required: [true, "Password is required"]
  }
});

const User = mongoose.model("User", userSchema)

export default User