import { type RouteParams } from '@dobschal/express-route-loader'
import { template } from '../core/html'

export async function get ({ res }: RouteParams<void>): Promise<void> {
  res.send(template('Hello', '<h1>Hello World!</h1>'))
}
