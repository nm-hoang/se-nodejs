/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var OwnerRepository = require('../repositories/ownerRepository')
OwnerRepository = new OwnerRepository()

const { DataChecker } = require('../utils/checkers')

class OwnerController extends BaseController {
  constructor() {
    super(OwnerRepository)
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

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params
      const query = req.query

      await OwnerRepository.updateStatus({ _id: id }, query.status)
      res.status(200).send('Updated')
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = OwnerController
