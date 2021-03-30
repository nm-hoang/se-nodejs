/** @format */

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var dotenv = require('dotenv')
var bodyParser = require('body-parser')
var cors = require('cors')
var methodOverride = require('method-override')
var errorHandler = require('./utils/errors')
var helmet = require('helmet')
var session = require('express-session')

dotenv.config({ path: '.env' })

// Services
require('./services/db')

var app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

// Set IP
// Object.defineProperty(app.request, 'ip', {
//   configurable: true,
//   enumerable: true,
//   get: function () {
//     return this.get('Client-IP')
//   },
// })

app.use(cors())
app.use(helmet())
app.disable('x-powered-by')

app.set('trust proxy', 1) // Trust first proxy
app.use(
  session({
    secret: process.env.APP_SECRET,
    name: 'hbs',
    cookie: { secure: true },
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
app.use(methodOverride())

// Routing
var Router = require('./routes/index')
Router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(errorHandler)

module.exports = app
