const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  emailActivate,
  forgotPassword,
} = require("../controllers/authController");

router.get("/all", getAllUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate-account", emailActivate);
router.put("/forgotPassword", forgotPassword);

module.exports = router;
