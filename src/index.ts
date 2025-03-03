import dotenv from 'dotenv'

import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { database } from './core/database'
import { routeLoader } from '@dobschal/express-route-loader'
import { ValidationError } from 'sequelize'

dotenv.config()

setup().catch((e) => {
  console.error('❌[server] Setup failed: ', e)
})

async function setup (): Promise<void> {
  console.log('Environment: ', process.env.NODE_ENV)

  await database.authenticate()

  const app: Express = express()
  const port = process.env.PORT as string

  app.use(bodyParser.json())
  app.use(routeLoader(path.join(__dirname, '/routes')))
  app.use(errorHandler)

  await database.sync() // needs to be done after the routes are loaded

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

function errorHandler (error: Error, req: Request, res: Response, next: NextFunction): void {
  let statusCode = Number(error.message.substring(0, 3))
  if (isNaN(statusCode)) statusCode = 500
  if (statusCode === 500) {
    if (error instanceof TypeError || error instanceof ValidationError) {
      statusCode = 400
    } else {
      console.error('❌[server] Error: ', error)
    }
  }
  res.status(statusCode).send({ error: error.message })
}
