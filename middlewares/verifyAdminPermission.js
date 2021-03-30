/** @format */

const User = require('../models/Users')

const checkPermisson = async (role, userId) => {
  try {
    const _user = await User.findById({ _id: userId })

    if (_user) {
      if (_user._id.toString() === userId) {
        if (_user.role === role) {
          return true
        }
      }
    }

    return false
  } catch (error) {
    // return false
    throw new Error(error.message)
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const role = 'admin'
    const check = await checkPermisson(role, req.userId)

    if (check) {
      req.role = role
      next()
    } else throw new Error('Permission denied')
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}

const isUser = async (req, res, next) => {
  try {
    const role = 'user'
    const check = await checkPermisson(role, req.userId)

    if (check) {
      req.role = role
      next()
    } else throw new Error('Permission denied')
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}

module.exports = {
  isAdmin,
  isUser,
}
