/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Post = require('../models/Posts')

class PostRepository extends BaseRepository {
  constructor() {
    super(Post) // Transfer interactive model
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

module.exports = PostRepository
