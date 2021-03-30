/** @format */

function errors(error, req, res, next) {
  console.log('Error > ', error.message ?? error)

  if (error) {
    res.locals.message = error.message
    res.locals.error = req.app.get('env') === 'development' ? error : {}

    return res
      .status(error.status || 500)
      .json({ error: error.message ?? error })
  } else {
    next()
  }
}

module.exports = errors
