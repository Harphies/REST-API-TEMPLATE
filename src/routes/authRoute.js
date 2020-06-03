const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  emailActivate,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.get("/all", getAllUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate-account", emailActivate);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);

module.exports = router;
