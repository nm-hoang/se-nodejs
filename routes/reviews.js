/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var reviewController = require('../controllers/reviewController')
// Check Module Controller
if (typeof reviewController === 'function') {
  reviewController = new reviewController()
}

class ReviewRouter extends BaseRouter {
  constructor() {
    super(reviewController, router)
  }

  findReviewByHotelId() {
    // /hotel?params=values
    router
      .route('/hotel')
      .get(async (req, res, next) =>
        reviewController.findReviewByHotelId(req, res, next)
      )
  }
}

const Router = new ReviewRouter()

Router.findReviewByHotelId()

// Init base routers or overrided routers
//Router.getAll()
Router.store()
Router.getSingle()
Router.update()
Router.destroy()

module.exports = router
