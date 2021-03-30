/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var paymentController = require('../controllers/paymentController')
// Check Module Controller
if (typeof paymentController === 'function') {
  paymentController = new paymentController()
}

class PaymentRouter extends BaseRouter {
  constructor() {
    super(paymentController, router)
  }

  createPaymentUrl() {
    router
      .route('/create_payment_url')
      .post((req, res, next) =>
        paymentController.createPaymentUrl(req, res, next)
      )
  }

  vnpayReturn() {
    router
      .route('/vnpay_return')
      .get((req, res, next) => paymentController.vnpayReturn(req, res, next))
  }

  vnpayIPN() {
    router
      .route('/vnpay_ipn')
      .get((req, res, next) => paymentController.vnpayIPN(req, res, next))
  }
}

const Router = new PaymentRouter()

// Router.getAll()
// Router.getSingle()
Router.createPaymentUrl()
// Router.vnpayReturn() // Un-use
Router.vnpayIPN()

module.exports = router
