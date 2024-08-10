import express from "express";
import User from "./userSchema.js";
import Branch from "./branchSchema.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        success: true,
        body: user,
        message: "User fetch successfully!",
        code: 200,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "User was not founded!",
        code: 404,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});
router.post("/", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const image = req.body.image;
  const email = req.body.email;
  const province = req.body.province;
  const description = req.body.description;
  const branch = req.body.branch;
  if (!firstname && !lastname && !phone && !email && !province && !branch) {
    res.status(401).json({
      success: false,
      body: null,
      message: "Please fill out fields completely!",
      code: 401,
    });
  }
  try {
    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      province,
      image,
      description,
      branch,
    });
    await newUser.save();
    res.json({
      success: true,
      body: newUser,
      message: "New User Created Successfully!",
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const firstname = req.body.firstname ?? user.firstname;
      const lastname = req.body.lastname ?? user.lastname;
      const phone = req.body.phone ?? user.phone;
      const email = req.body.email ?? user.email;
      const image = req.body.image ?? user.image;
      const province = req.body.province ?? user.province;
      const description = req.body.description ?? user.description;
      const branch = req.body.branch ?? user.branch;
      const newUser = {
        firstname,
        lastname,
        phone,
        email,
        image,
        province,
        description,
        branch,
      };
      const updateUser = await User.findByIdAndUpdate(req.params.id, newUser);
      res.status(201).json({
        success: true,
        body: updateUser,
        message: "user was updated successfully!",
        code: 201,
      });
    } else {
      res.status(400).json({
        success: false,
        body: null,
        message: "Please fill out all fields!",
        code: 400,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        body: null,
        message: "user was deleted successfully!",
        code: 200,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "user was founded !",
        code: 404,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});

export default router;
