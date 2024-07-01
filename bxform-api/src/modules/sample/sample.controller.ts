import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { ISample } from 'modules/sample/sample.interfaces'
import Sample from 'modules/sample/sample.model'
import {
  CreateSampleInput,
  DeleteSampleParam,
  EditSampleInput,
  EditSampleParam,
  GetSampleParam,
  GetSamplesQueryParam
} from 'modules/sample/sample.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export async function createSampleHandler(
  request: FastifyRequest<{
    Body: CreateSampleInput
  }>,
  reply: FastifyReply
) {
  const body = request.body

  const sample = await Sample.findOne({ name: body.name })

  if (sample) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sample name already exists')
  }

  const newSample = await Sample.create(body)

  return new ApiResponse(httpStatus.OK, 'createSampleHandler', newSample)
}

export async function editSampleHandler(
  request: FastifyRequest<{
    Body: EditSampleInput
    Params: EditSampleParam
  }>,
  reply: FastifyReply
) {
  const body = request.body
  const params = request.params

  const sample = await Sample.findByIdAndUpdate(params.id, body, { new: true })

  if (!sample) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sample not found')
  }

  return new ApiResponse(httpStatus.OK, 'editSampleHandler', sample)
}

export async function getSamplesHandler(
  request: FastifyRequest<{
    Querystring: GetSamplesQueryParam
  }>
) {
  const query: FilterQuery<ISample> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])
  Object.assign(options)

  const res = await Sample.paginate({ ...query }, options)

  return new ApiResponse(httpStatus.OK, 'getSamplesHandler', res)
}

export async function getSampleHandler(
  request: FastifyRequest<{
    Params: GetSampleParam
  }>,
  reply: FastifyReply
) {
  const params = request.params

  const sample = await Sample.findById(params.id)

  if (!sample) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Sample not found')
  }

  return new ApiResponse(httpStatus.OK, 'getSampleHandler', sample)
}

export async function deleteSampleHandler(
  request: FastifyRequest<{
    Params: DeleteSampleParam
  }>,
  reply: FastifyReply
) {
  const params = request.params

  const sample = await Sample.findById(params.id)

  if (!sample) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Sample not found')
  }

  await sample.deleteOne()

  return new ApiResponse(httpStatus.OK, 'deleteSampleHandler', sample)
}
