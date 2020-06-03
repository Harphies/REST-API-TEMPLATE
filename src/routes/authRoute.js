const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
  confirmEmail,
  activatemail,
  forgotPassword,
  resetPassword,
  emailConfirmation,
} = require("../controllers/authController");

router.get("/all", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/confirmemail", confirmEmail);
router.post("/activatemail", activatemail);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.put("/activatemail", emailActivate);

module.exports = router;
