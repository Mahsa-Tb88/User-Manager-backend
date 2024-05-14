import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    unique: true,
    required: true,
  },
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
