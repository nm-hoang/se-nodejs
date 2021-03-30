/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const User = require('../models/Users')

class UserRepository extends BaseRepository {
  constructor() {
    super(User) // Transfer interactive model
  }

  /**
   * Override if needed
   * @param {getAll}
   * @param {getSingle}
   * @param {store}
   * @param {update}
   * @param {destroy}
   */
}

module.exports = UserRepository
