import express from "express";
import Branch from "./branchSchema.js";
import User from "./userSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.branch ?? "";
  const query = { branchName: RegExp(search, "i") };
  try {
    const branches = await Branch.find(query);
    res.json({
      success: true,
      body: branches,
      message: "Branches fetch Successfully!",
      code: 200,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      body: null,
      message: e.message,
      code: 500,
    });
  }
});
router.get("/:branchName", async (req, res) => {
  const userSearch = req.query.user ?? "";
  try {
    const branch = await Branch.findOne({ branchName: req.params.branchName });
    if (branch) {
      const query = {
        $or: [
          { firstname: RegExp(userSearch, "i") },
          { lastname: RegExp(userSearch, "i") },
        ],
      };
      query.branch = req.params.branchName;
      const searchUserInBranch = await User.find(query);
      res.json({
        success: true,
        body: searchUserInBranch,
        message: "branch fetch successfully!",
        code: 200,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "branch Not Founded!",
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
  if (req.body.branchName) {
    try {
      const findBranch = await Branch.findOne({
        branchName: req.body.branchName,
      });
      if (!findBranch) {
        const newBranch = new Branch({
          branchName: req.body.branchName,
        });

        await newBranch.save();
        res.status(201).json({
          success: true,
          body: newBranch,
          message: "new Branch created Successfully!",
          code: 201,
        });
      } else {
        return res.status(401).json({
          success: false,
          body: null,
          message: "This BranchName is already exist!",
          code: 401,
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
  } else {
    res.status(400).json({
      success: false,
      body: null,
      message: "Please enter a name for branch!",
      code: 400,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (branch) {
      const updateBranch = await Branch.findByIdAndUpdate(
        req.params.id,
        {
          branchName: req.body.branchName ?? branch.branchName,
        },
        { new: true }
      );

      const updateBranchNameOfUsers = await User.updateMany(
        {
          branch: branch.branchName,
        },
        { branch: req.body.branchName ?? branch.branchName }
      );

      res.status(201).json({
        success: true,
        body: updateBranch,
        message: "Branch updated successfully!",
        code: 201,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "Branch Not Founded!",
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
router.delete("/:id", async (req, res) => {
  try {
    const findBranch = await Branch.findById(req.params.id);
    if (findBranch) {
      const usersOfBranch = await User.findOne({
        branch: findBranch.branchName,
      });
      if (usersOfBranch) {
        return res.status(401).json({
          success: false,
          body: null,
          message: "We can not delete this branch because of some users in it!",
          code: 401,
        });
      }
      const branches = await Branch.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        body: null,
        message: "Branch Deleted Successfully!",
        code: 200,
      });
    } else {
      res.status(404).json({
        success: false,
        body: null,
        message: "Branch  Not Founded!",
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
