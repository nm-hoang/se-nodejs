/** @format */

// BaseController
const BaseController = require('./baseController')
// Module Repository

// Packages
var config = require('config')
var dateFormat = require('dateformat')
var querystring = require('qs')

class PaymentController extends BaseController {
  constructor() {
    super()
  }

  async getAll(req, res, next) {
    try {
      return res.status(200).json({ message: 'Success' })
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  /**
   * POST create_payment_url
   */
  createPaymentUrl(req, res, next) {
    try {
      var ipAddr =
        req.headers['X-Forwarded-For'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

      // Standardize Ip Address
      ipAddr = ipAddr.slice(7, ipAddr.length)

      var tmnCode = config.get('vnp_TmnCode')
      var secretKey = config.get('vnp_HashSecret')
      var vnpUrl = config.get('vnp_Url')
      var returnUrl = config.get('vnp_ReturnUrl')

      // Standardize Return URL
      returnUrl = (req.headers.origin || process.env.HOST) + returnUrl

      var date = new Date()

      var createDate = dateFormat(date, 'yyyymmddHHmmss')
      var orderId = dateFormat(date, 'HHmmss')
      var amount = req.body.amount
      var bankCode = req.body.bankCode || 'NCB' // Test Only

      var orderInfo = req.body.orderDescription || 'Booking receipt'
      var orderType = req.body.orderType
      var locale = req.body.language || 'vn'
      if (locale === null || locale === '') {
        locale = 'vn'
      }
      var currCode = 'VND'
      var vnp_Params = {}
      vnp_Params['vnp_Version'] = '2'
      vnp_Params['vnp_Command'] = 'pay'
      vnp_Params['vnp_TmnCode'] = tmnCode
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params['vnp_Locale'] = locale
      vnp_Params['vnp_CurrCode'] = currCode
      vnp_Params['vnp_TxnRef'] = orderId
      vnp_Params['vnp_OrderInfo'] = orderInfo
      vnp_Params['vnp_OrderType'] = orderType || 'topup'
      vnp_Params['vnp_Amount'] = amount * 100
      vnp_Params['vnp_ReturnUrl'] = returnUrl
      vnp_Params['vnp_IpAddr'] = ipAddr
      vnp_Params['vnp_CreateDate'] = createDate
      if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode
      }

      vnp_Params = sortObject(vnp_Params)

      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false })

      var sha256 = require('sha256')

      var secureHash = sha256(signData)

      vnp_Params['vnp_SecureHashType'] = 'SHA256'
      vnp_Params['vnp_SecureHash'] = secureHash
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true })

      // Start transaction

      //Neu muon dung Redirect thi dong dong ben duoi
      res.status(200).json({ code: '00', data: vnpUrl })
      //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
      //res.redirect(vnpUrl)
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  // Un-use
  vnpayReturn(req, res, next) {
    try {
      var vnp_Params = req.query

      var secureHash = vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHash']
      delete vnp_Params['vnp_SecureHashType']

      vnp_Params = sortObject(vnp_Params)

      var config = require('config')
      var tmnCode = config.get('vnp_TmnCode')
      var secretKey = config.get('vnp_HashSecret')

      var querystring = require('qs')
      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false })

      var sha256 = require('sha256')

      var checkSum = sha256(signData)

      if (secureHash === checkSum) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
      } else {
        res.render('success', { code: '97' })
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }

  vnpayIPN(req, res, next) {
    try {
      var vnp_Params = req.query
      var secureHash = vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHash']
      delete vnp_Params['vnp_SecureHashType']

      vnp_Params = sortObject(vnp_Params)
      var config = require('config')
      var secretKey = config.get('vnp_HashSecret')
      var querystring = require('qs')
      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false })

      var sha256 = require('sha256')

      var checkSum = sha256(signData)

      if (secureHash === checkSum) {
        var orderId = vnp_Params['vnp_TxnRef']
        var rspCode = vnp_Params['vnp_ResponseCode']
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ Message: 'success', orderId, rspCode })
      } else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}

function sortObject(o) {
  var sorted = {},
    key,
    a = []

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key)
    }
  }

  a.sort()

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]]
  }
  return sorted
}

module.exports = PaymentController
