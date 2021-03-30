/** @format */

var mongoose = require('mongoose')
mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) {
      console.log(error.message)
      console.log('>> NOT connect to db')
    } else {
      console.log('>> Connected to db')
    }
  }
)
