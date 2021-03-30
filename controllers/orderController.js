/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var OrderRepository = require('../repositories/orderRepository')
OrderRepository = new OrderRepository()
const { DataChecker } = require('../utils/checkers')

class OrderController extends BaseController {
  constructor() {
    super(OrderRepository)
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
        user_id,
        room_id,
        user_name,
        email,
        phone_number,
        checkin,
        no_nights,
        no_user,
        no_room,
        price,
      } = req.body

      const check = DataChecker({
        room_id,
        user_name,
        email,
        phone_number,
        checkin,
        // no_nights,
        // no_user,
        // no_room,
        // price,
      })

      if (check.status) {
        const order = {
          user_id: user_id || 'guest',
          room_id,
          user_name,
          email,
          phone_number,
          checkin: Date(checkin),
          no_nights,
          no_user,
          no_room,
          price,
        }

        // const room = await OrderRepository.getSingle({ _id: room_id })
        const check = await OrderRepository.check({ room_id, email })
        if (check) {
          throw new Error('Exists')
        }

        await OrderRepository.store(order)
        res.status(200).send('Stored')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      error.status = 403
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      // Get data
      const { id } = req.params
      const {
        user_id,
        room_id,
        user_name,
        email,
        phone_number,
        card_number,
        checkin,
        no_nights,
        no_user,
        no_room,
        price,
      } = req.body

      const check = DataChecker({
        user_id,
        room_id,
        user_name,
        email,
        phone_number,
        card_number,
        checkin,
        no_nights,
        no_user,
        no_room,
        price,
      })

      if (check.status) {
        await OrderRepository.update(
          { _id: id },
          {
            user_id,
            room_id,
            user_name,
            email,
            phone_number,
            card_number,
            checkin: Date(checkin),
            no_nights,
            no_user,
            no_room,
            price,
            updatedDate: new Date(Date.now()),
          }
        )
        res.status(200).send('Updated')
      } else {
        throw new Error(`${check.message} is required`)
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  async findOrderByUserId(req, res, next) {
    try {
      const query = req.query
      const orders = await OrderRepository.findOrderByUserId(
        query.id,
        query.pageNumber,
        query.pageSize
      )
      res.status(200).json({ data: orders })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = OrderController
