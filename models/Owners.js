/** @format */
const mongoose = require('mongoose')

const ownerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  hotel_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'denied',
  },
  createdDate: {
    type: Date,
    default: new Date(Date.now()),
  },
  updatedDate: {
    type: Date,
    default: new Date(Date.now()),
  },
})

module.exports = mongoose.model('Owner', ownerSchema)
