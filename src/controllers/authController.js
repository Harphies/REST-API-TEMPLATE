const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require('lodash')
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
    expiresIn: "1d",
  });
  // create a clickable email url
  const data = {
    from: "noreply.hello.com",
    to: email,
    subject: "Account Activation Link",
    html: `Please click on the given link to reset your password: <a href="url"> ${process.env.CLIENT_URL}/api/user/resetpassword/${token}</a>,`,
  };
  const success = await user.updateOne({ resetLink: token });
  if (!success) return res.status(400).send("User Reset password failed");
  // send email
  mg.message().send(data, (error, body) => {
    if (error) return res.status(400).json({ error: error.message });
    return res.json({
      message: "Email has been sent, kindly follow the Instruction",
    });
  });
};
exports.resetPassword = async (req, res) => {
  const { resetLink, newPassword } = req.body;
  if (!resetLink) return res.status(401).send("Authentication error");
  jwt.verify(resetLink, process.env.RESET_TOKEN, (error, data) => {
    if (error)
      return res.status(401).json({ error: "Incorrect token or it's expired" });
    const user = await User.findOne({resetLink})
    if (!user) return res.status(400).json({message:"user with this token does not xist"})
    // create a new password
    const obj = {
      password:newPassword,
      resetLink:''
    }
    user = _.extend(user,obj)
    try {
      const savedUser = await user.save()
    res.status(200).json({message:"your password has been changed"})
    res.redirect('Login page')
    } catch (err){
      res.json({message:"Reset password error"})
    }
    
  });
};
