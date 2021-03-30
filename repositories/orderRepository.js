/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Order = require('../models/Orders')

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order) // Transfer interactive model
  }

  /**
   * Override if needed
   * @param {getAll}
   * @param {getSingle}
   * @param {store}
   * @param {update}
   * @param {destroy}
   */

  async findOrderByUserId(user_id, page = 1, limit = 10) {
    try {
      page = Number.parseInt(page)
      size = Number.parseInt(limit)

      return await Order.find({ user_id }).limit(limit).skip(page)
    } catch (error) {
      throw new Error(error)
    }
  }

  async check(data) {
    try {
      const { room_id, email } = data
      return await Order.find({ room_id, email })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = OrderRepository
