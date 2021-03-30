/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var HotelRepository = require('../repositories/hotelRepository')
var OwnerRepository = require('../repositories/ownerRepository')
HotelRepository = new HotelRepository()
OwnerRepository = new OwnerRepository()

const { DataChecker } = require('../utils/checkers')

class HotelController extends BaseController {
  constructor() {
    super(HotelRepository)
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
      const {
        name,
        tag,
        location,
        descriptions,
        discount,
        images,
        rating,
        status,
        taxes,
        facilities,
        policy,
      } = req.body

      const check = DataChecker({
        name,
        tag,
        no_address: location.no_address,
        street: location.street,
        ward: location.ward,
        district: location.district,
        city: location.city,
      })

      if (check.status) {
        const hotel = {
          name,
          tag,
          location,
          descriptions,
          discount,
          images,
          rating,
          status,
          taxes,
          facilities,
          policy,
        }

        await HotelRepository.store(hotel).then(async (response) => {
          try {
            const user_id = req.userId
            const hotel_id = response._id

            await OwnerRepository.store({ user_id, hotel_id })
          } catch (error) {
            throw new Error(error.message)
          }
        })

        res.status(200).send('Stored')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      // Get data
      const { id } = req.params
      const {
        name,
        tag,
        location,
        descriptions,
        discount,
        images,
        rating,
        status,
        taxes,
        facilities,
        policy,
      } = req.body

      const check = DataChecker({
        name,
        tag,
        no_address: location.no_address,
        street: location.street,
        ward: location.ward,
        district: location.district,
        city: location.city,
      })

      if (check.status) {
        await HotelRepository.update(
          { _id: id },
          {
            name,
            tag,
            location,
            descriptions,
            discount,
            images,
            rating,
            status,
            taxes,
            facilities,
            policy,
            updatedDate: new Date(Date.now()),
          }
        )

        res.status(200).send('Updated')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      next(error)
    }
  }

  async getIds(req, res, next) {
    try {
      let ids = []

      const data = await HotelRepository.getAll().then((response) => {
        for (const r of response) {
          const id = r._id
          ids = [...ids, id]
        }

        return ids
      })

      return res.status(200).json({ length: data.length, data })
    } catch (error) {
      error.status = 403
      next(error)
    }
  }
}

module.exports = HotelController
