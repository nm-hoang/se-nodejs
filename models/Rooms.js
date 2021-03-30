/** @format */

const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  hotel_id: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
    required: false,
  },
  type: {
    type: String,
    require: true,
  },
  capacity: {
    type: Number,
    require: false,
  },
  no_bunk: {
    type: Object,
    require: true,
  },
  no_guest: {
    type: Number,
    require: true,
  },
  facilities: {
    type: Object,
    require: false,
  },
  policy: {
    type: Object,
    require: false,
  },
  price: {
    type: Number,
    require: true,
  },
  square: {
    type: Number,
    required: false,
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

module.exports = mongoose.model('Room', roomSchema)
