const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  activateUser,
  loginUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");

router.get("/all", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate", activateUser);
router.put("/forgetpassword", forgetPassword);
router.put("/resetpassword", resetPassword);

module.exports = router;
