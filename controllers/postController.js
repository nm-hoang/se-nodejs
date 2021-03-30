/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository
var PostRepository = require('../repositories/postRepository')
PostRepository = new PostRepository()

class PostController extends BaseController {
  constructor() {
    super(PostRepository)
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
      const data = req.body

      // Standardization
      const post = {
        content: data.content,
        userId: req.userId,
      }

      // Store
      const _post = await PostRepository.store(post)

      res.status(200).send(_post)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      // Get data
      const { id } = req.params
      const { content } = req.body

      if (!content) throw new Error('Content is required')

      // Update
      const post = await PostRepository.update({ _id: id, content })

      // Check
      if (post) await res.status(200).send('Updated')
      else await res.status(404).send({ errors: 'Post does not exist' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PostController
