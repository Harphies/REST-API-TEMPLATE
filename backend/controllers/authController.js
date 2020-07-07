const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { OAuth2Client } = require('google-auth-library')
const { response } = require('express')
const { Doctor } = require('../models/DoctorModel')

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
exports.registerUser = async (req, res) => {
  res.status(200).send('register')
}

// @desc   Activate user and save to database
// @route  POST /api/v1/auth/activate
// @access Private
exports.activateUser = async (req, res) => {}

// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
exports.loginUser = async (req, res) => {}

// @desc   Get current Logged in user
// @route  POST /api/v1/auth/me
// @access Private
exports.getMe = async (req, res) => {}

// @desc   Logout  user / clear cookie
// @route  GET /api/v1/auth/logout
// @access Private
exports.logoutUser = async (req, res, next) => {}

// @desc   Update user details
// @route  PUT /api/v1/auth/updatedetails
// @access Private
exports.updateDetails = async (req, res) => {}

// @desc   Update Password
// @route  PUT /api/v1/auth/updatepassword
// @access Private
exports.updatePassword = async (req, res) => {}

// @desc   Forgot Password
// @route  POST /api/v1/auth/forgotpassword
// @access Public
exports.forgotPassword = async (req, res) => {}

// @desc   Reset Password
// @route  PUT /api/v1/auth/resetpassword
// @access Public
exports.resetPassword = async (req, res) => {}

// @desc   Sign in with Google
// @route  POST /api/v1/auth/google
// @access Private

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
exports.signInWithGoogle = async (req, res) => {
  const { idToken } = req.body
  try {
    const response = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
    })
    // if there is no response
    if (!response) return res.status(400).send('Unable to retrive your Info')
    // if there is response, get the Info
    const { email_verified, name, email } = response.payload
    if (!email_verified) return res.status(400).send('email not verified')
    // check if the user already exist
    const doctor = await Doctor.findOne({ email })
    if (doctor) {
      // if user already exist, generate a token and log the user in
      const token = jwt.sign({ _id: doctor._id }, process.env.GOOGLE_JWT, {
        expiresIn: '7d',
      })
      const { _id, email, firstName } = doctor
      return res.json({
        token,
        user: { _id, email, firstName },
      })
    }
    // generate a password for the user and register the user.
    let password = email + process.env.GOOGLE_JWT
    const newDoctor = new Doctor({ name, email, password })
    try {
      const createdDoctor = await newDoctor.save()
      if (!createdDoctor) return res.status(400).send('Not saved')
      // generate a token for the newly created user
      const token = jwt.sign(
        { _id: createdDoctor._id },
        process.env.TOKEN_SECRET,
        { expiresIn: '3d' }
      )
      const { _d, emai } = createdDoctor
      return res.status(200).json({ token, user: { _id, email } })
    } catch (error) {
      return res.status(400).send('Unable to save the user')
    }
  } catch (error) {
    res.status(400).send('Error Verify IdToken')
  }
}
