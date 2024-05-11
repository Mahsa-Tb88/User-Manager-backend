import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./usersRoutes.js";
import branchesRoutes from "./branchesRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const allowExtension = ["jpg", "png", "webp"];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const extension = file.originalname.split(".").pop();
    if (!allowExtension.includes(extension.toLowerCase())) {
      return cb({ error: "Invalid Extension" });
    }
    cb(null, path.join(__dirname, "uploads"));
  },
  filename(req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = file.originalname.split(".")[0];
    const newName = filename + "-" + Date.now() + "." + extension;
    cb(null, newName);
  },
});

const uploder = multer({ storage, limits: { fileSize: 300000 } });
app.post("/uploads", uploder.single("my-file"), (req, res) => {
  res.json(req.file);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((err, req, res, next) => {
  req.json(err);
});

app.use("/branches", branchesRoutes);
app.use("/users", usersRoutes);
