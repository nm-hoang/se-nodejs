/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var ownerController = require('../controllers/ownerController')
// Check Module Controller
if (typeof ownerController === 'function') {
  ownerController = new ownerController()
}

class OwnerRouter extends BaseRouter {
  constructor() {
    super(ownerController, router)
  }

  updateStatus() {
    router
      .route('/:id')
      .patch(async (req, res, next) =>
        ownerController.updateStatus(req, res, next)
      )
  }
}

const Router = new OwnerRouter()

Router.updateStatus()

// Init base routers or overrided routers
Router.getAll()
//Router.store()
// Router.getSingle()
// Router.update()
// Router.destroy()

module.exports = router
