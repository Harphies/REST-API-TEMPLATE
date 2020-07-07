const express = require('express')
const router = express.Router()
const {
  registerUser,
  activateUser,
  loginUser,
  getMe,
  logoutUser,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  signInWithGoogle,
} = require('../controllers/authController')

// Auth Routes
/**
 * @swagger
 * /register:
 *  post:
 *    description: use to register a user
 *    responses:
 *      '200':
 *        description: A succesful response
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /authWithGoogle:
 *  post:
 *    description: Sign In with Google Account as Google will redirect user here.
 *
 */
router.post('/authWithGoogle', signInWithGoogle)

module.exports = router
