const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  emailActivate,
  forgotPassword,
  resetPassword,
  emailConfirmation,
  emailActivate,
} = require("../controllers/authController");

router.get("/all", getAllUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/activate-account", emailActivate);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/confirmemail", emailConfirmation);
router.put("/activatemail", emailActivate);

module.exports = router;
