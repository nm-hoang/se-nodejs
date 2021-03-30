/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var roomController = require('../controllers/roomController')
// Check Module Controller
if (typeof roomController === 'function') {
  roomController = new roomController()
}

class RoomRouter extends BaseRouter {
  constructor() {
    super(roomController, router)
  }

  addRoom() {
    router
      .route('/:id')
      .patch(async (req, res, next) => roomController.addRoom(req, res, next))
  }

  findRoomByHotelId() {
    // /hotel?params=values
    router
      .route('/hotel')
      .get(async (req, res, next) =>
        roomController.findRoomByHotelId(req, res, next)
      )
  }
}

const Router = new RoomRouter()

Router.addRoom()
Router.findRoomByHotelId()

// Init base routers or overrided routers
Router.getAll()
Router.store()
Router.getSingle()
Router.update()
Router.destroy()

module.exports = router
