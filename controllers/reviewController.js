/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var ReviewRepository = require('../repositories/reviewRepository')
ReviewRepository = new ReviewRepository()
const { DataChecker } = require('../utils/checkers')

class ReviewController extends BaseController {
  constructor() {
    super(ReviewRepository)
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
      const { user_id, content, hotel_id } = req.body

      const check = DataChecker({
        user_id,
        content,
        hotel_id,
      })

      if (check.status) {
        const review = {
          user_id,
          content,
          hotel_id,
        }

        await ReviewRepository.store(review)
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
      const { user_id, content, hotel_id } = req.body

      const check = DataChecker({
        user_id,
        content,
        hotel_id,
      })

      if (check.status) {
        await ReviewRepository.update(
          { _id: id },
          {
            user_id,
            content,
            hotel_id,
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

  async findReviewByHotelId(req, res, next) {
    try {
      const query = req.query
      const reviews = await ReviewRepository.findReviewByHotelId(query.id, query.pageNumber, query.pageSize)
      res.status(200).json({ data: reviews })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = ReviewController
