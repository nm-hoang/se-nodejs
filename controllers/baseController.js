/** @format */

class BaseController {
  constructor(Repository) {
    console.log('>> Connected to BaseController')
    this.Repository = Repository
  }

  async getAll(req, res, next) {
    try {
      const data = await this.Repository.getAll(req.query.page, req.query.limit)

      // Check
      if (data) res.status(200).json({ data, length: data.length })
      else res.status(404).send({ errors: 'Something went wrong' })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  async getSingle(req, res, next) {
    try {
      // Get id
      const { id } = req.params
      // Get data details
      const data = await this.Repository.getSingle(id)

      // Check
      if (data) res.status(200).send(data)
      else res.status(404).send({ errors: 'Something went wrong' })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  store(req, res, next) {
    try {
      throw new Error('Method not available!')
    } catch (error) {
      error.status = 404
      next(error)
    }
  }

  update(req, res, next) {
    try {
      throw new Error('Method not available!')
    } catch (error) {
      error.status = 404
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      // Get id
      const { id } = req.params

      // Destroy
      const data = await this.Repository.destroy(id)

      if (data) res.status(200).send('Deleted')
      else res.status(404).send({ errors: `Something went wrong!` })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

module.exports = BaseController
