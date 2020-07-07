const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ProfileImage: { type: String, required: false },
    specialization: { type: String, required: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Doctor', ProfileSchema)
