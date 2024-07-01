import config from 'configs/config'
import crypto from 'crypto'

export function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16) // Generate a random salt
  const key = crypto.pbkdf2Sync(config.passwordSecret, salt, 100000, 32, 'sha512') // Derive a key from the password and salt
  const iv = crypto.randomBytes(16) // Generate a random IV (Initialization Vector)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(password, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return {
    salt: salt.toString('hex'),
    iv: iv.toString('hex'),
    encryptedPassword: encrypted
  }
}

export function verifyPassword({
  encryptedPassword,
  salt,
  iv,
  password
}: {
  encryptedPassword: string
  salt: string
  iv: string
  password: string
}) {
  const key = crypto.pbkdf2Sync(config.passwordSecret, Buffer.from(salt, 'hex'), 100000, 32, 'sha512')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'))

  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted === password
}
