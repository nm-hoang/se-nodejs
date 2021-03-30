/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var HotelRepository = require('../repositories/hotelRepository')
HotelRepository = new HotelRepository()

class SearchEngineController extends BaseController {
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

  async search(req, res, next) {
    try {
      const query = req.query
      const result = await HotelRepository.search(query)

      res.status(200).json({ length: result.length, page: query.page, result })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = SearchEngineController
