const express = require("express");
const router = express.Router();
const User = require("../model/User");

exports.getAllUsers = async (req, res) => {
  try {
    const newUser = await User.find();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.registerUser = async (req, res) => {
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
