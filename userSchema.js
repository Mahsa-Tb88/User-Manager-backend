import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  province: {
    type: Number,
    required: true,
  },
  avatarURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "write something...",
  },
  branch: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
