/** @format */

function DataChecker(data) {
  try {
    /**
     * Give it an Object of @data
     *
     * @return {
     *    status: true | false,
     *    message: key_name if status false
     * }
     */

    const _keys = Object.keys(data)

    for (let i = 0; i < _keys.length; i++) {
      if (!data[_keys[i]] || data[_keys[i]].trim().length <= 0) {
        return { status: false, message: `${_keys[i]}` }
      }
    }

    return { status: true, message: null }
  } catch (error) {
    throw new Error(error.message)
  }
}

function DateChecker(f_date, s_date = new Date(Date.now())) {
  try {
    if (f_date > s_date) {
      return true // Not expired
    }
    return false // Expired
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  DataChecker,
  DateChecker,
}
