import express, { type Express } from 'express'
import dotenv from 'dotenv'
import users from './routes/users'
import index from './routes/index'

dotenv.config()

const app: Express = express()
const port = process.env.PORT as string

app.use('/', index)
app.use('/users', users)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
