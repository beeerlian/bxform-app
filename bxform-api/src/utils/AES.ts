import crypto from 'crypto'

export function aesEncrypt(message: string) {
  const cryptoConfig = {
    Securitykey: 'cc32c89e78b1145ef7c82f6925c32c8f',
    algorithm: 'aes-256-cbc',
    initVector: '1365cf6b9acbe658'
  }
  const crypto = require('crypto')

  const cipher = crypto.createCipheriv(cryptoConfig.algorithm, cryptoConfig.Securitykey, cryptoConfig.initVector)

  let encryptedData = cipher.update(message, 'utf-8', 'hex')

  encryptedData += cipher.final('hex')
  return encryptedData
}

export function aesDecrypt(encryptedData: string) {
  const cryptoConfig = {
    Securitykey: 'cc32c89e78b1145ef7c82f6925c32c8f',
    algorithm: 'aes-256-cbc',
    initVector: '1365cf6b9acbe658'
  }
  const decipher = crypto.createDecipheriv(cryptoConfig.algorithm, cryptoConfig.Securitykey, cryptoConfig.initVector)
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decryptedData += decipher.final('utf8')
  return decryptedData
}
