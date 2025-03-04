import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export async function sendEmail (to: string, subject: string, html: string): Promise<SMTPTransport.SentMessageInfo> {
  return await new Promise<SMTPTransport.SentMessageInfo>((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    }
    transporter.sendMail(mailOptions, function (error: Error | null, info: SMTPTransport.SentMessageInfo) {
      if (error != null) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
