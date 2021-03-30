/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Hotel = require('../models/Hotels')
const { response } = require('express')

class HotelRepository extends BaseRepository {
  constructor() {
    super(Hotel) // Transfer interactive model
  }

  /**
   * Override if needed
   * @param {getAll}
   * @param {getSingle}
   * @param {store}
   * @param {update}
   * @param {destroy}
   */

  async search({ query, page = 1, limit = 10 }) {
    try {
      const hotel = await Hotel.aggregate([
        { $match: { $text: { $search: `"\"${JSON.stringify(query)}\""` } } },
        { $match: { lowest_price: { $ne: null } } },
        { $sort: { score: { $meta: 'textScore' } } },
      ])
        .limit(Number.parseInt(limit))
        .skip(Number.parseInt(page))

      return hotel
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateLowestPrice(hotel_id, lowest_price) {
    try {
      return await Hotel.findOneAndUpdate({ _id: hotel_id }, { lowest_price })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = HotelRepository
