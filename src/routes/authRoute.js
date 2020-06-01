const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/all", authController.getAllUsers);

router.post("/register", authController.registerUser);

module.exports = router;
