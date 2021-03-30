/** @format */
/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var UserRepository = require('../repositories/userRepository')
UserRepository = new UserRepository()

class UserController extends BaseController {
  constructor() {
    super(UserRepository)
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
}

module.exports = UserController
