/** @format */
const uploadImage = require('../utils/uploadImage')

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var PostController = require('../controllers/postController')
// Check Module Controller
if (typeof PostController === 'function') {
  PostController = new PostController()
}

class PostRouter extends BaseRouter {
  constructor() {
    super(PostController, router)
  }

  /**
   * Override if needed
   */

  // r() {
  //   router.route('/test').get((req, res) => PostController.getAll(req, res))
  // }

  /**
   * Custom routers
   * Watch out: Custom function order
   */
  custom() {
    router.route('/upload').get(async (req, res) => {
      const data = { imageName: 'wpp_4.jpg' }
      const result = await uploadImage(data)
      res.status(200).send({ nude: 'oh', result })
    })
  }
}

/**
 * Init Router
 */
const Router = new PostRouter()
// Init custom routers
Router.custom()

// Init base routers or overrided routers
Router.getAll()
Router.store()
Router.getSingle()
Router.update()
Router.destroy()

module.exports = router
