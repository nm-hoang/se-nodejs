/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Review = require('../models/Reviews')

class ReviewRepository extends BaseRepository {
    constructor() {
        super(Review) // Transfer interactive model
    }

    /**
     * Override if needed
     * @param {getAll}
     * @param {getSingle}
     * @param {store}
     * @param {update}
     * @param {destroy}
     */

    async findReviewByHotelId(hotel_id, pageNumber = 1, pageSize = 1) {
        try {
            const page = Number.parseInt(pageNumber)
            const size = Number.parseInt(pageSize)
            return await Review.find({ hotel_id }).limit(size).skip(size * page - size)
        } catch (error) {
            throw new Error(error)
        }
    }

}

module.exports = ReviewRepository
