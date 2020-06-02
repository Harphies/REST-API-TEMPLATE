const express = require("express");
const { authToken } = require("../middleware/verifyToken");
const router = express.Router();
const { getPosts } = require("../controllers/postController");

router.get("/", authToken, getPosts);

module.exports = router;
