/** @format */

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  userId: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Post', postSchema)
