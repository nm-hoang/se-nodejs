/** @format */
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  room_id: {
    type: String,
    require: true,
  },
  user_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone_number: {
    type: Number,
    require: true,
  },
  card_number: {
    type: Number,
    require: false,
  },
  checkin: {
    type: Date,
    require: true,
  },
  no_nights: {
    type: Number,
    require: true,
  },
  no_user: {
    type: Number,
    require: true,
  },
  no_room: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
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

module.exports = mongoose.model('Order', orderSchema)
