/** @format */

// Middlewares
const verifyToken = require('../middlewares/verifyToken')
const { isAdmin, isUser } = require('../middlewares/verifyAdminPermission')
const Tracker = require('../middlewares/tracker')

var authRouter = require('./auth')
var postRouter = require('./posts')
var hotelRouter = require('./hotels')
var userRouter = require('./users')
var roomRouter = require('./rooms')
var searchEngine = require('./searchEngine')
var ownerRouter = require('./owners')
var reviewRouter = require('./reviews')
var orderRouter = require('./orders')
var paymentRouter = require('./payments')

const Router = (app) => {
  app.use([Tracker])
  app.use('/auth', authRouter)
  app.use('/posts', [verifyToken], postRouter)
  app.use('/hotels', hotelRouter) // isAdmin
  app.use('/rooms', roomRouter)
  app.use('/search', searchEngine)
  app.use('/owners', [verifyToken], ownerRouter) //isSU
  app.use('/reviews', reviewRouter)
  app.use('/orders', orderRouter)
  // app.use('/users', [verifyToken, isUser], userRouter)
  app.use('/payments', paymentRouter)
}

module.exports = Router
