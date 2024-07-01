import S3 from 'aws-sdk/clients/s3'
import config from 'configs/config'
import { createReadStream } from 'fs'
import { MulterFile } from 'modules/file/file.interfaces'
import { removeLocalFile, removeLocalFileAws } from 'utils/file-system.utils'

const { bucketName, region, accessKeyId, secretAccessKey } = config.aws

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

export const uploadFileToS3 = async (file: MulterFile) => {
  if (!file) {
    return
  }

  const fileStream = createReadStream(file.path)

  try {
    const response = await s3
      .upload({
        Bucket: bucketName ?? 'coopsis',
        Body: fileStream,
        Key: `coopsis/${file.filename}`,
        ContentType: file.mimetype,
        ACL: 'public-read'
      })
      .promise()

    await removeLocalFileAws(response)

    return response
  } catch (error) {
    removeLocalFile(file.path)

    console.log('error', error)
  }
}
