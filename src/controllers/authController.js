const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const sgMail = require("@sendgrid/mail");
const { OAuth2Client } = require("google-auth-library");
sgMail.setApiKey(process.env.MAIL_KEY);
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
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
  // Note: The client URL is the url of where the client app will be hosted. it's different from the back end.
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

  /// const { _id, name } = user;
  res.header("auth-token", token).send(token);
};
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = forgetPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check the user if it exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User with this email does not exist");
  // generate a token
  const token = jwt.sign(
    { _id: user._id },
    process.env.FORGET_PASSWORD_SECRET,
    { expiresIn: "2h" }
  );
  // send an email link for retrieving password.
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset link",
    html: `
    <h1> Please click this link to Reset your password</h1>
    <p>${process.env.CLIENT_URL}/user/password/reset/${token} </p>
    <hr/>
    <p>This email contains sensitive Info</p>
    <p>${process.env.CLIENT_URL}</p>
    `,
  };
  try {
    await user.updateOne({
      resetPasswordLink: token,
    });
    // send email
    try {
      await sgMail.send(emailData);
      return res.json({ message: "Email has been sent" });
    } catch (error) {
      return res.json({ error });
    }
  } catch (err) {
    res.status(400).send("Error Updating the Reset Link");
  }
};
exports.resetPassword = async (req, res) => {
  // validate the data
  const { error } = resetPasswordValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    try {
      jwt.verify(resetPasswordLink, process.env.FORGET_PASSWORD_SECRET);
      const user = await User.findOne({
        resetPasswordLink,
      });
      if (!user) return res.status(400).send("Something went wrong, try again");
      // update the user with the new password and empty the reset link in the db
      const updateFields = {
        password: newPassword,
        resetPasswordLink: "",
      };
      user = _.extend(user, updateFields);
      try {
        await user.save();
        res.status(200).json({
          message: "Looking good;You can now login with your new password",
        });
      } catch (err) {
        res.status(400).send("Error resetting your password");
      }
    } catch (err) {
      res.status(403).send("Expired Link, try again");
    }
  }
};

// Sign In with Google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
exports.signInWithGoogle = async (req, res) => {
  const { idToken } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
    });
    // check if there is no response
    if (!response) return res.status(400).send("Unable to retrive your data");
    // check if there is a response
    const { email_verified, name, email } = response.payload;
    // If the email is not verified
    if (!email_verified) return res.status(400).send("Email Not verifid");
    // If the email is verified, check if we have the user in the Db
    const user = await User.findOne({ email });
    // if user exist, generate a token for the user and allow it to sign in.
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
      });
      const { _id, email, name } = user;
      return res.json({
        token,
        user: { _id, email, name },
      });
    }
    // if the user doesn't exist; create the user and save into the Db
    let password = email + process.env.TOKEN_SECRET;
    user = new User({ name, email, password });
    try {
      const createdUser = await user.save();
      if (!createdUser) return res.status(400).send("Empty data");
      // generate a token for the newly created user
      const token = jwt.sign(
        { _id: createdUser._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      const { _id, email, name } = createdUser;
      return res.status(200).json({ token, user: { _id, email, name } });
    } catch (err) {
      return res.status(400).send("User signUp failed with Google");
    }
  } catch (err) {
    res.send("Google Login failed, Try again");
  }
};
exports.updateProfile = async (req, res) => {};
exports.logoutUser = async (req, res) => {};
exports.updatePassword = async (req, res) => {};
