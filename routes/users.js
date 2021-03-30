/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var UserController = require('../controllers/userController')
// Check Module Controller
if (typeof UserController === 'function') {
  UserController = new UserController()
}

class UserRouter extends BaseRouter {
  constructor() {
    super(UserController, router)
  }
}

/**
 * Init Router
 */
const Router = new UserRouter()
// Init custom routers
//

// Init base routers or overrided routers
Router.getAll()
Router.store()
Router.getSingle()
Router.update()
Router.destroy()

module.exports = router
