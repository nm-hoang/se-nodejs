/** @format */

const Tracker = (req, res, next) => {
  try {
    const ip = req.ip
    const remoteAddress =
      req.headers['X-Forwarded-For'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress
    const host = req.host

    const data = {
      ip,
      remoteAddress,
      host,
      subdomains: req.subdomains,
      protocol: req.protocol,
      device: req.headers['user-agent'],
      request: {
        host: req.headers.origin,
        originalUrl: req.originalUrl,
        methods: req.method,
        data: req.body,
        query: req.query,
      },
    }

    console.log('Request from >> ', data)
    next()
  } catch (error) {
    console.log(error.message)
    next()
  }
}

module.exports = Tracker
