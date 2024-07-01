import { S3 } from 'aws-sdk'
import config from 'configs/config'
import { existsSync, unlink } from 'fs'
import util from 'util'

const unlinkFile = util.promisify(unlink)

export const removeLocalFileAws = async (file: S3.ManagedUpload.SendData) => {
  const filePath = `${config.filesDir}/${file.Key.replaceAll(config.appName + '/', '')}`

  if (existsSync(filePath)) {
    unlinkFile(filePath)
  }
}

export const removeLocalFile = async (filePath: string) => {
  if (existsSync(filePath)) {
    unlinkFile(filePath)
  }
}
