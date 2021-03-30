/** @format */

const randomstring = require('randomstring')
const bcrypt = require('bcryptjs')

function GenerateCode(option) {
  try {
    /**
     * @option can be Object or Numberic
     * Readmore on randomstring npm [link](npmjs.com/package/randomstring)
     */

    const code = randomstring.generate(option)

    return code
  } catch (error) {
    throw new Error(error.message)
  }
}

async function GeneratePassword(password) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    return hashedPassword
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  GenerateCode,
  GeneratePassword,
}
