import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./usersRoutes.js";
import branchesRoutes from "./branchesRoutes.js";

const app = express();
app.use(express.json());

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
} catch (e) {
  console.log(e.message);
}
app.use("/branches", branchesRoutes);
app.use("/users", usersRoutes);
