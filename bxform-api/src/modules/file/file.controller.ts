import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { IFile } from 'modules/file/file.interfaces'
import FileModel from 'modules/file/file.model'
import { GetFileParam, GetFilesQueryParam } from 'modules/file/file.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

import { uploadFileToS3 } from 'utils/aws-s3/awsS3.service'

export async function createFilesHandler(request: any, reply: FastifyReply) {
  const files = request.files.files

  if (!files) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file found')
  }

  // upload s3
  const uploadPromises = files.map(async (file: any) => {
    const uploadedFile = await uploadFileToS3(file)

    if (uploadedFile) {
      const createtFile = await FileModel.create({
        name: file.originalname,
        url: uploadedFile.Location,
        format: file.mimetype,
        key: uploadedFile.Key
      })

      return createtFile
    }
  })

  const uploadResults = await Promise.all(uploadPromises)

  return new ApiResponse(httpStatus.OK, 'createFileHandler', uploadResults)
}

export async function createFileHandler(request: any, reply: FastifyReply) {
  const { file, body } = request

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file found')
  }

  const uploadedFile = await uploadFileToS3(file)

  if (!uploadedFile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Upload file failed')
  }

  const createtFile = await FileModel.create({
    name: body.name ? body.name : file.originalname,
    url: uploadedFile.Location,
    format: file.mimetype,
    key: uploadedFile.Key,
    customId: body.customId
  })

  return new ApiResponse(httpStatus.OK, 'createFileHandler', createtFile)
}

export async function getFilesHandler(
  request: FastifyRequest<{
    Querystring: GetFilesQueryParam
  }>
) {
  const query: FilterQuery<IFile> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])
  Object.assign(options)

  const res = await FileModel.paginate({ ...query }, options)
  return new ApiResponse(httpStatus.OK, 'getFilesHandler', res)
}

export async function getFileHandler(
  request: FastifyRequest<{
    Params: GetFileParam
  }>,
  reply: FastifyReply
) {
  const params = request.params
  const file = await FileModel.findById(params.id)

  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found')
  }
  return new ApiResponse(httpStatus.OK, 'getFileHandler', file)
}
