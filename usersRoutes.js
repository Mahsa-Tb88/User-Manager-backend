import express from "express";
import User from "./userSchema.js";

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
        message: "User not founded!",
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
  const email = req.body.email;
  const province = req.body.province;
  const avatarURL = req.body.avatarURL;
  const description = req.body.description;
  const branch = req.body.branch;

  if (
    req.body.firstname &&
    lastname &&
    phone &&
    email &&
    province &&
    avatarURL &&
    branch
  ) {
    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      province,
      avatarURL,
      description,
      branch,
    });
    newUser.save();
    res.json({
      success: true,
      body: newUser,
      message: "New User Created Successfully!",
      code: 200,
    });
  } else {
    res.status(401).json({
      success: false,
      body: null,
      message: "Please fill out fields completely!",
      code: 401,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user){
        const updateUser=new User({})
    }else{}
  } catch (e) {}
});
router.delete("/:id", async (req, res) => {});

export default router;
