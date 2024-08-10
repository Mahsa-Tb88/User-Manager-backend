import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./usersRoutes.js";
import branchesRoutes from "./branchesRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

const uploder = multer({ storage, limits: { fileSize: 800000 } });

app.post("/uploads", uploder.single("file"), (req, res) => {
  res.json(req.file);
});
app.use((err, req, res, next) => {
  res.json(err);
});

app.use("/branches", branchesRoutes);
app.use("/users", usersRoutes);

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/user_manager");
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
} catch (e) {
  console.log(e.message);
}
