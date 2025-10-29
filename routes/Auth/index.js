const express = require("express");
const signin = require("../../controller/auth/signin.js");
// const signup = require("../../controller/auth/signup.js");
const {
  deleteUser,
  signup,
  updateUser,
} = require("../../controller/auth/signup.js");
const router = express.Router();

// Signup Route
router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/signup/:email12", deleteUser);
router.put("/signup/:id", updateUser);
module.exports = router;
