const express = require("express");
const router = express.Router();
const { saveUser } = require("../controllers/userController");
router.post("/register", saveUser);
module.exports = router;
