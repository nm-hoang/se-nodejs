/** @format */

const nodemailer = require('nodemailer')

async function SendEmail(to, subject, content, html) {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  return await transporter.sendMail({
    from: process.env.APP_NAME + ' <' + process.env.MAIL_USERNAME + '>',
    to,
    subject,
    text: content,
    html, // <h1>Content</h1>
  })
}

module.exports = { SendEmail }
