/** @format */
const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    require: true,
  },
  descriptions: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  images: {
    type: Array,
    default: [],
    require: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  taxes: {
    type: Number,
    required: false,
  },
  facilities: {
    type: Object,
    required: false,
  },
  policy: {
    type: Object,
    required: false,
  },
  lowest_price: {
    type: Number,
    default: 0,
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

hotelSchema.indexes({ name: 'text', location: 'text', '$**': 'text' })

module.exports = mongoose.model('Hotel', hotelSchema)
