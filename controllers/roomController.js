/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var RoomRepository = require('../repositories/roomRepository')
var HotelRepository = require('../repositories/hotelRepository')
RoomRepository = new RoomRepository()
HotelRepository = new HotelRepository()
const { DataChecker } = require('../utils/checkers')
const { response } = require('express')

class RoomController extends BaseController {
  constructor() {
    super(RoomRepository)
  }

  /**
   * Override if needed
   *
   * Returned Data by default
   * @param {getAll}
   * @param {getSingle}
   * @param {destroy}
   *
   * Returned Error by default
   * @param {store}
   * @param {update}
   */

  async store(req, res, next) {
    try {
      // Receive data
      // Standardization
      const {
        name,
        hotel_id,
        images,
        type,
        capacity,
        no_bunk,
        no_guest,
        facilities,
        policy,
        price,
        square,
      } = req.body

      if (no_bunk instanceof Object) {
        if (no_bunk.single < 1 && no_bunk.double < 1) {
          throw new Error(`no_bunk is required`)
        }
      } else {
        throw new Error(`no_bunk is required`)
      }

      const check = DataChecker({
        name,
        hotel_id,
        type,
        capacity,
        no_guest,
        price,
      })

      if (check.status) {
        const room = {
          name,
          hotel_id,
          images,
          type,
          capacity,
          no_bunk,
          no_guest,
          facilities,
          policy,
          price,
          square,
        }

        await RoomRepository.store(room).then(async (response) => {
          const hotel_id = response.hotel_id
          const price = response.price

          try {
            const hotel = await HotelRepository.getSingle(hotel_id)

            if (
              Number(price) <= Number(hotel.lowest_price) ||
              Number(hotel.lowest_price) === 0
            ) {
              await HotelRepository.updateLowestPrice(hotel_id, price)
            }
          } catch (error) {
            throw new Error(error.message)
          }
        })

        res.status(200).send('Stored')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      // Get data
      const { id } = req.params
      const {
        name,
        immges,
        type,
        capacity,
        no_bunk,
        no_guest,
        facilities,
        policy,
        price,
        square,
      } = req.body

      const check = DataChecker({
        name,
        type,
        capacity,
        no_guest,
        price,
      })

      if (no_bunk instanceof Object) {
        if (no_bunk.single < 1 && no_bunk.double < 1) {
          throw new Error(`no_bunk is required`)
        }
      } else {
        throw new Error(`no_bunk is required`)
      }

      if (check.status) {
        await RoomRepository.update(
          { _id: id },
          {
            name,
            immges,
            type,
            capacity,
            no_bunk,
            no_guest,
            facilities,
            policy,
            price,
            square,
            updatedDate: new Date(Date.now()),
          }
        ).then(async (response) => {
          const room_id = response._id

          try {
            const room = await RoomRepository.getSingle(room_id)
            const hotel = await HotelRepository.getSingle(room.hotel_id)

            if (
              Number(price) <= Number(hotel.lowest_price) ||
              Number(hotel.lowest_price) === 0
            ) {
              await HotelRepository.updateLowestPrice(room.hotel_id, price)
            }
          } catch (error) {
            throw new Error(error.message)
          }
        })
        res.status(200).send('Updated')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  async addRoom(req, res, next) {
    try {
      const { id } = req.params
      const query = req.query

      await RoomRepository.addRoom({ _id: id }, query.capacity)

      res.status(200).send('Added')
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  async findRoomByHotelId(req, res, next) {
    try {
      const query = req.query
      const data = await RoomRepository.findRoomByHotelId(
        query.id,
        query.page,
        query.limit
      )
      res.status(200).json({ length: data.length, data })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = RoomController
