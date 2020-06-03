const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if the current user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send("You're not a registered user;you can't login.");
  // Check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  // Create and Asign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "20m",
  });
  res.header("auth-token", token).send(token);
};

exports.emailActivate = async (req, res) => {};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  // check if the user exist
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).send("User with this email deos not exist!");
  //  send an email
  const token = jwt.sign({ _id: user._id }, process.env.RESET_TOKEN, {
    expiresIn: "20m",
  });
};
