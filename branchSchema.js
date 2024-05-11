import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    unique: true,
    required: true,
  },
  usersBranch: {
    type: [String],
    default: [],
  },
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
