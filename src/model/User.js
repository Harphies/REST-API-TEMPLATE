const mongoose = require("mongoose");

// Schema is all about the desciption of the data
const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 34,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    max: 45,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  resetPasswordLink: {
    data: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", PostSchema);
