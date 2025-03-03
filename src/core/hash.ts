import crypto from 'crypto'

export default function hash (plainText: string): string {
  const hash = crypto.createHash('sha256')
  hash.update(plainText)
  return hash.digest('hex')
}
