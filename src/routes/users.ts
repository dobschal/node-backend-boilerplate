import User from '../models/User'
import { type InferCreationAttributes } from 'sequelize'
import hash from '../core/hash'
import { authenticate, createToken, verifyToken } from '../core/authentication'
import { type RouteParams } from '@dobschal/express-route-loader'
import { throwError } from '../core/error'
import { sendEmail } from '../core/email'
import { template } from '../core/html'

export const prefix = '/users'

// region type checks

function isTokenQuery (query: any): query is { token: string } {
  return typeof query.token === 'string'
}

function isUserBody (body: any): body is InferCreationAttributes<User> {
  return typeof body.email === 'string' && typeof body.password === 'string' && Object.keys(body).length === 2
}

// endregion

// region routes

export async function getCurrent ({ req }: RouteParams): Promise<User> {
  const { userId } = authenticate(req)
  return (await User.findByPk(userId)) ?? throwError(404, 'User not found')
}

export async function getVerifyEmail ({
  query,
  res
}: RouteParams): Promise<void> {
  try {
    if (!isTokenQuery(query)) {
      throwError(400, 'Token is missing')
    }
    const { userId } = verifyToken(query.token)
    await User.update({ emailVerified: true }, { where: { id: userId } })
    res.send(template('Email verified', '<h1>Done.</h1><p>Your email has been verified</p>'))
  } catch (e) {
    res.send(template('Error', '<h1>Error</h1><p>The link isn\'t valid. Could not verify email.</p>'))
  }
}

export async function postRegister ({ body }: RouteParams): Promise<User> {
  if (!isUserBody(body)) {
    throw new Error('400: Invalid request data')
  }
  const user = await User.create({
    email: body.email,
    password: hash(body.password)
  })
  const token = createToken({ userId: user.id })
  await sendEmail(user.email, 'Welcome', `
    <div style="padding: 16px; font-family: Helvetica, Arial, sans-serif">
        <h1>Verify your email</h1>
        <p>Click the link below to verify your email address</p>
        <a href="http://localhost:3000/users/verify/email?token=${token}">Verify Email</a>
    </div>
  `)
  return user
}

export async function postLogin ({ body }: RouteParams): Promise<{ token: string }> {
  if (!isUserBody(body)) {
    throw new Error('400: Invalid request data')
  }
  const user = await User.findOne({ where: { email: body.email } })
  if (user == null) {
    throw new Error('401: User not found')
  }
  if (user.password !== hash(body.password)) {
    throw new Error('401: Wrong password')
  }
  return {
    token: createToken({ userId: user.id })
  }
}

// endregion
