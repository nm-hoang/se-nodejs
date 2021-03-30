/** @format */

// Call base functions
const BaseRepository = require('./baseRepository')

// Interactive Model
const Owner = require('../models/Owners')

class OwnerRepository extends BaseRepository {
    constructor() {
        super(Owner) // Transfer interactive model
    }

    /**
     * Override if needed
     * @param {getAll}
     * @param {getSingle}
     * @param {store}
     * @param {update}
     * @param {destroy}
     */

    async updateStatus(_id, status) {
        try {
            return await Owner.findOneAndUpdate({ _id }, { status: status })
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = OwnerRepository