/** @format */

// BaseRouter
const BaseRouter = require('./baseRouter')

const router = require('express').Router()
// Module Controller
var SearchEngineController = require('../controllers/searchEngineController')
// Check Module Controller
if (typeof SearchEngineController === 'function') {
  SearchEngineController = new SearchEngineController()
}

class SearchEngineRouter extends BaseRouter {
  constructor() {
    super(SearchEngineController, router)
  }

  /**
   * Override if needed
   */

  // r() {
  //   router.route('/test').get((req, res) => SearchEngineControll.getAll(req, res))
  // }

  /**
   * Custom routers
   * Watch out: Custom function order
   */
  search() {
    router
      .route('/')
      .get(
        async (req, res, next) =>
          await SearchEngineController.search(req, res, next)
      )
  }
}

/**
 * Init Router
 */
const Router = new SearchEngineRouter()
// Init custom routers
Router.search()

// Init base routers or overrided routers
// Router.getAll()
// Router.store()
// Router.getSingle()
// Router.update()
// Router.destroy()

module.exports = router
