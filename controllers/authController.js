/** @format */

const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ForgotPassword = require('../models/ForgotPassword')
const { GenerateCode, GeneratePassword } = require('../utils/generators')
const { DataChecker, DateChecker } = require('../utils/checkers')
const { SendEmail } = require('../utils/mailer')

const register = async (req, res) => {
  try {
    const {
      fullname,
      username,
      email,
      password,
      password_confirmation,
    } = req.body

    // Find existing email
    const emailExist = await User.findOne({ email })
    if (emailExist) throw new Error('Email already exists')

    // Check password
    if (password.trim() === password_confirmation.trim()) {
      // Hash password
      const hashedPassword = await GeneratePassword(password)

      const user = new User({
        fullname,
        username,
        email,
        password: hashedPassword,
        role: 'user',
      })

      const savedUser = await user.save()

      res.status(200).json({ id: savedUser._id })
    } else {
      throw new Error('Wrong confirm password')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password, remember } = req.body
    // Check existing username
    const user = await User.findOne({ username })
    if (!user) throw new Error('Username is not found')

    const validPass = await bcrypt.compareSync(password, user.password)
    if (!validPass) throw new Error('Invalid password')

    // Create and assign a token
    const payload = {
      _id: user._id,
      role: user.role,
    }

    let access_token = respondWithToken(
      payload,
      remember,
      process.env.ACCESS_TOKEN_SECRET
    )
    let refresh_token = respondWithToken(
      payload,
      remember,
      process.env.REFRESH_TOKEN
    )
    access_token = 'Bearer ' + access_token
    refresh_token = 'Bearer ' + refresh_token

    res
      .status(200)
      .header('Authorization', access_token)
      .json({ payload, access_token, refresh_token })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: error.message })
  }
}

const logout = (req, res) => {
  try {
    const bearerToken = req.header('Authorization')

    if (!bearerToken) throw new Error('Access Denied')

    if (bearerToken.startsWith('Bearer ')) {
      const access_token = bearerToken.substring(7, bearerToken.length)
      const verified = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)

      // Destroy access_token
      //
    } else {
      // If not Bearer Token
      throw new Error('Invalid Token')
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ error })
    } else {
      throw new Error(error)
    }
  }
}

const getMe = async (req, res) => {
  try {
    const _user = await User.findById({ _id: req.userId })

    // Check authorize user
    if (_user._id === req.userId) {
      return res.status(401).send('Unauthorized')
    } else {
      return res.status(200).send('Authorized')
    }
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}

const changePassword = async (req, res) => {
  try {
    const { old_password, new_password, new_password_confirmation } = req.body

    // Check input data
    const check = DataChecker({
      old_password,
      new_password,
      new_password_confirmation,
    })

    if (check.status) {
      const _user = await User.findById({ _id: req.userId })

      if (_user) {
        if (old_password.trim() !== new_password.trim()) {
          const validPass = await bcrypt.compareSync(
            old_password,
            _user.password
          )

          if (validPass) {
            if (new_password.trim() === new_password_confirmation.trim()) {
              const hashedPassword = await GeneratePassword(new_password)

              await User.findOneAndUpdate(
                { _id: _user._id },
                {
                  password: hashedPassword,
                }
              )
            } else {
              throw new Error('Confirm password does not match!')
            }
          } else {
            throw new Error('Wrong old password!')
          }
        } else {
          throw new Error('New password must be different from old password!')
        }
      } else {
        throw new Error('Something went wrong!')
      }
    } else {
      throw new Error(`${check.message} is required!`)
    }

    return res.status(200).json({ error: 'Password changed' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const forgotPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body
    const to = email
    const subject = 'Reset password request'

    const check = DataChecker({ to: email, subject })

    if (check.status) {
      const reset_token = GenerateCode(36) // Generate random string with 8 characters
      const content = 'Click link below to renew your password!'
      const html = `<a href="${process.env.HOST}/auth/renew-password?access_token=${reset_token}">Renew your password</a>`

      // Send mail with code
      const mail = await SendEmail(to, subject, content, html)

      // Save token to db
      await ForgotPassword.create({
        email,
        reset_token,
      })

      return res.status(200).json({ status: true, message: 'Success' })
    } else {
      throw new Error(`${check.message} is required!`)
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function forgotPasswordCheck(req, res, next) {
  try {
    const { new_password, new_password_confirmation } = req.body

    // Check sent email from middleware
    if (res.locals.email) {
      const email = res.locals.email
      const reset_token = res.locals.reset_token

      const check = DataChecker({
        new_password,
        new_password_confirmation,
        email,
      })

      if (check.status) {
        const _user = await User.findOne({ email })

        if (_user) {
          if (new_password.trim() === new_password_confirmation.trim()) {
            const hashedPassword = await GeneratePassword(new_password)

            // Update new password
            await User.findOneAndUpdate(
              { email },
              { password: hashedPassword }
            ).then(async () => {
              const reset_request = await ForgotPassword.findOne({
                reset_token,
              })

              if (reset_request) {
                const _reset_request = await ForgotPassword.findOneAndUpdate(
                  { reset_token },
                  { status: true }
                )

                // Final response
                return await res
                  .status(200)
                  .json({ status: true, message: null })
              } else {
                throw new Error('Request not found!')
              }
            })
          } else {
            throw new Error('Confirm password does not match!')
          }
        } else {
          throw new Error('User not found!')
        }
      } else {
        throw new Error(`${check.message} is required!`)
      }
    } else {
      throw new Error('Session ended!')
    }
  } catch (error) {
    error.status = 400
    next(error)
  }
}

async function resetPassword(req, res) {}

function respondWithToken(payload, remember, secret) {
  const access_token = jwt.sign(
    {
      payload,
    },
    secret,
    {
      algorithm: 'HS256',
      expiresIn: remember
        ? Number(process.env.ACCESS_TOKEN_LIFE) * 7
        : Number(process.env.ACCESS_TOKEN_LIFE),
    }
  )

  return access_token
}

module.exports = {
  register,
  login,
  getMe,
  changePassword,
  forgotPasswordRequest,
  forgotPasswordCheck,
  logout,
}
