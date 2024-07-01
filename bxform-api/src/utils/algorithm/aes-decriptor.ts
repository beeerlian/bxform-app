import crypto from 'crypto'

const aesDecryptor = (encryptedData, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decryptedData += decipher.final('utf8')
  return decryptedData
}
