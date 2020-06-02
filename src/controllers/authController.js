const express = require("express");
const router = express.Router();
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation");

exports.getAllUsers = async (req, res) => {
  try {
    const newUser = await User.find();
    res.json(newUser);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.registerUser = async (req, res) => {
  // Validate user before saving to database
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user already exist in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist! Alas");

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
