/** @format */

const router = require('express').Router()
const {
  register,
  login,
  getMe,
  changePassword,
  forgotPasswordCheck,
  forgotPasswordRequest,
  logout,
} = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const { verifyPasswordResetToken } = require('../middlewares/verifyResetToken')

router.post('/register', [register])

router.post('/login', [login])

router.get('/me', [verifyToken], [getMe])

router.post('/forgot-password-request', [forgotPasswordRequest])

router.get(
  '/forgot-password-check',
  [verifyPasswordResetToken],
  [forgotPasswordCheck]
)

router.post('/change-password', [verifyToken], [changePassword])

router.get('/logout', [verifyToken], [logout])

module.exports = router
