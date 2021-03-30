/** @format */

const mongoose = require('mongoose')

function getExpireDate(duration = 1) {
  try {
    let date = new Date(Date.now())
    date.setDate(date.getDate() + duration)

    return date
  } catch (error) {
    throw new Error(error.message)
  }
}

const forgotPassword = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  reset_token: {
    type: String,
    required: true,
  },
  expire_date: {
    type: Date,
    default: getExpireDate(1),
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdDate: {
    type: Date,
    default: new Date(Date.now()),
  },
})

module.exports = mongoose.model('ForgotPassword', forgotPassword)
