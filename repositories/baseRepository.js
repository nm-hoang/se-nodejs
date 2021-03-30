/** @format */

class BaseRepository {
  constructor(model) {
    console.log('>> Connected to BaseRepository')
    this.model = model
  }

  async getAll(pageNumber = 1, pageSize = 1) {
    try {
      // const page = Number.parseInt(pageNumber)
      // const size = Number.parseInt(pageSize) * 10
      return await this.model.find({})
      // .limit(size)
      // .skip(size * page - size)
    } catch (error) {
      throw new Error(error)
    }
  }

  async getSingle(id) {
    try {
      return await this.model.findById({ _id: id })
    } catch (error) {
      throw new Error(error)
    }
  }

  async store(data) {
    try {
      return await this.model.create(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(_id, data) {
    try {
      return await this.model.findOneAndUpdate(_id, data)
    } catch (error) {
      throw new Error(error)
    }
  }

  async destroy(id) {
    try {
      return await this.model.findOneAndDelete({ _id: id })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = BaseRepository
