const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.get("/all", getAllUsers);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
