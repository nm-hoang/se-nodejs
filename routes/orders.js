/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var orderController = require('../controllers/orderController')
// Check Module Controller
if (typeof orderController === 'function') {
  orderController = new orderController()
}

class OrderRouter extends BaseRouter {
  constructor() {
    super(orderController, router)
  }

  findOrderByUserId() {
    // /user?params=values
    router
      .route('/user')
      .get(async (req, res, next) =>
        orderController.findOrderByUserId(req, res, next)
      )
  }
}

const Router = new OrderRouter()

Router.findOrderByUserId()

// Init base routers or overrided routers
Router.getAll()
Router.store()
Router.getSingle()
Router.update()
Router.destroy()

module.exports = router
