const express = require("express");
const router = express.Router();
const User = require("../model/User");
exports.saveUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
};
