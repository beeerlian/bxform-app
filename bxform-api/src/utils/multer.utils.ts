import config from 'configs/config'
import multer from 'fastify-multer'
import { Field } from 'fastify-multer/lib/interfaces'
import httpStatus from 'http-status'
import path from 'path'
import ApiError from 'utils/api-error'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.filesDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${config.appName}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 300000000 // 300000000 Bytes = 30 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|svg|jpeg|webp|csv)$/)) {
      return cb(new ApiError(httpStatus.BAD_REQUEST, 'Upload only png | jpg | svg | jpeg | webp | csv format'))
    }

    cb(null, true)
  }
})

export const uploadMulterFields = (fields: string[]) => {
  const fieldArray: Field[] = []

  if (fields) {
    fields.forEach(field => {
      fieldArray.push({ name: field, maxCount: 3 })
    })
  }

  return upload.fields(fieldArray)
}

export const uploadMulterSingle = (field: string) => {
  return upload.single(field)
}
