/** @format */

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    const bearerToken = req.header('authorization')

    if (!bearerToken) throw new Error('Access Denied')

    if (bearerToken.startsWith('Bearer ')) {
      const token = bearerToken.substring(7, bearerToken.length)
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = verified
      req.userId = verified.payload._id
      next()
    } else {
      // If not Bearer Token
      throw new Error('Invalid Token')
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ error })
    } else {
      throw new Error(error.message)
    }
  }
}

// Generate SECRET
// > require('crypto').randomBytes(64).toString('hex')
