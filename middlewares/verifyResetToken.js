/** @format */

const ForgotPassword = require('../models/ForgotPassword')
const { DateChecker } = require('../utils/checkers')

const verifyPasswordResetToken = async (req, res, next) => {
  try {
    const { token } = req.query

    if (token) {
      const reset_request = await ForgotPassword.findOne({ reset_token: token })

      if (reset_request) {
        const expire_check = DateChecker(reset_request.expire_date)

        if (expire_check && !reset_request.status) {
          const email = reset_request.email
          res.locals.email = email
          res.locals.reset_token = reset_request.reset_token
          next()
        } else {
          throw new Error('Token expired')
        }
      } else {
        throw new Error('Invalid request!')
      }
    } else {
      throw new Error('Invalid token!')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { verifyPasswordResetToken }
