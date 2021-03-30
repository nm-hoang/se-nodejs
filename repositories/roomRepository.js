/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Room = require('../models/Rooms')

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room) // Transfer interactive model
  }

  /**
   * Override if needed
   * @param {getAll}
   * @param {getSingle}
   * @param {store}
   * @param {update}
   * @param {destroy}
   */

  async addRoom(_id, capacity) {
    try {
      return await Room.findOneAndUpdate({ _id }, { capacity: capacity })
    } catch (error) {
      throw new Error(error)
    }
  }

  async findRoomByHotelId(hotel_id, page = 1, limit = 10) {
    try {
      page = Number.parseInt(page)
      limit = Number.parseInt(limit)

      return await Room.find({ hotel_id }).limit(limit).skip(page)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = RoomRepository
