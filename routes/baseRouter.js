/** @format */

class BaseRouter {
  constructor(Controller, router) {
    console.log('>> Connected to BaseRouter')
    this.Controller = Controller
    this.router = router
  }

  getAll(middlewares = []) {
    this.router.get('/', [...middlewares], (req, res, next) =>
      this.Controller.getAll(req, res, next)
    )
  }

  store(middlewares = []) {
    this.router.post('/', [...middlewares], (req, res, next) =>
      this.Controller.store(req, res, next)
    )
  }

  getSingle(middlewares = []) {
    this.router.get('/:id', [...middlewares], (req, res, next) =>
      this.Controller.getSingle(req, res, next)
    )
  }

  update(middlewares = []) {
    this.router.put('/:id', [...middlewares], (req, res, next) =>
      this.Controller.update(req, res, next)
    )
  }

  destroy(middlewares = []) {
    this.router.delete('/:id', [...middlewares], (req, res, next) =>
      this.Controller.destroy(req, res, next)
    )
  }
}

module.exports = BaseRouter
