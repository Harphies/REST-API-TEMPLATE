const express = require("express");
const router = express.Router();

exports.getPosts = async (req, res) => {
  res.json(req.user);
};
