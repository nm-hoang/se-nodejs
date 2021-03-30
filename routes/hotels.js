/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var hotelController = require('../controllers/hotelController')
// Check Module Controller
if (typeof hotelController === 'function') {
  hotelController = new hotelController()
}

// Middlewares
const verifyToken = require('../middlewares/verifyToken')
const { isAdmin, isUser } = require('../middlewares/verifyAdminPermission')

class HotelRouter extends BaseRouter {
  constructor() {
    super(hotelController, router)
  }

  getIds() {
    router.route('/ids').get(async (req, res, next) => {
      await hotelController.getIds(req, res, next)
    })
  }
}

const Router = new HotelRouter()

// Init base routers or overrided routers
Router.getIds()
Router.getAll([isAdmin])
Router.store([verifyToken])
Router.getSingle()
Router.update([verifyToken, isAdmin])
Router.destroy([verifyToken, isAdmin])

module.exports = router
