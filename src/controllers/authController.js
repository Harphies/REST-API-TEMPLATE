const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);
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
  const { name, email, password } = req.body;
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user already exist in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist! Alas");

  // Generate a token
  const token = jwt.sign(
    {
      name,
      email,
      password,
    },
    process.env.ACTIVATE_TOKEN,
    { expiresIn: "2h" }
  );

  // Email Data sending
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Account activation link",
    html: `
    <h1> Please click this link to activate your account</h1>
    <p>${process.env.CLIENT_URL}/activate/${token} </p>
    <hr/>
    <p>This email contains sensitive Info</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  };
  // send email
  try {
    await sgMail.send(emailData);
    return res.json({ message: "Email has been sent" });
  } catch (error) {
    return res.json({ error });
  }
};

// Activation and save to database
exports.activateUser = async (req, res) => {
  const { token } = req.body;
  if (token) {
    // Verify if the token is valid ot it's expired.
    try {
      const verified = jwt.verify(token, process.env.ACTIVATE_TOKEN);
      const { name, email, password } = jwt.decode(token);
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      try {
        const saveUser = await newUser.save();
        res.json({ message: "Sign Up successful" });
      } catch (err) {
        res.json({ message: err });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    return res.json({ message: "error happen please try again" });
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
    expiresIn: "2d",
  });
  //res.header("auth-token", token).send(token);
  res.send(token);
};
exports.forgetPassword = async (req, res) => {};
exports.resetPassword = async (req, res) => {};
exports.updateProfile = async (req, res) => {};
exports.logoutUser = async (req, res) => {};
exports.updatePassword = async (req, res) => {};
