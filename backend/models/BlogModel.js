const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, 'please add a title'],
      unique: true,
      trim: true,
      maxlength: [50, 'Title can not be more than 50 characters'],
    },
    content: {
      type: String,
      required: [true, 'please add the content'],
      maxlength: [500, 'content can not be more than 500'],
    },
    tag: {
      type: String,
      required: [true, 'please includea tag'],
      maxlength: [100, 'please add a tag'],
    },
    image: {
      type: String,
      required: [true, 'please add a post image'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Blog', BlogSchema)
