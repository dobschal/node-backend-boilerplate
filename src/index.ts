import dotenv from 'dotenv'

import express, { type Express, type NextFunction, type Request, type Response } from 'express'
import users from './routes/users'
import index from './routes/index'
import { initDatabase, runDatabaseMigrations } from './core/database'
import bodyParser from 'body-parser'
dotenv.config()

setup().catch((e) => { console.error('❌[server] Setup failed: ', e) })

async function setup (): Promise<void> {
  console.log('Environment: ', process.env.NODE_ENV)

  initDatabase()
  await runDatabaseMigrations()

  const app: Express = express()
  const port = process.env.PORT as string

  app.use(bodyParser.json())

  app.use('/', index)
  app.use('/users', users)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

function errorHandler (error: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('Error handler: ', error)
  let statusCode = Number(error.message.substring(0, 3))
  if (isNaN(statusCode)) statusCode = 500
  res.status(statusCode).send({ error: error.message })
}
