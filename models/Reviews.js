/** @format */
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    hotel_id: {
        type: String,
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

module.exports = mongoose.model('Review', reviewSchema)
