import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { IBook } from 'modules/book/book.interfaces'
import Book from 'modules/book/book.model'
import {
  CreateBookInput,
  DeleteBookParam,
  EditBookInput,
  EditBookParam,
  GetBookParam,
  GetBooksQueryParam
} from 'modules/book/book.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export async function createBookHandler(
  request: FastifyRequest<{
    Body: CreateBookInput
  }>,
  reply: FastifyReply
) {
  const body = request.body

  const book = await Book.findOne({ name: body.name })

  if (book) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book name already exists')
  }

  const newBook = await Book.create(body)

  return new ApiResponse(httpStatus.OK, 'createBookHandler', newBook)
}

export async function editBookHandler(
  request: FastifyRequest<{
    Body: EditBookInput
    Params: EditBookParam
  }>,
  reply: FastifyReply
) {
  const body = request.body
  const params = request.params

  const book = await Book.findByIdAndUpdate(params.id, body, { new: true })

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  return new ApiResponse(httpStatus.OK, 'editBookHandler', book)
}

export async function getBooksHandler(
  request: FastifyRequest<{
    Querystring: GetBooksQueryParam
  }>
) {
  const query: FilterQuery<IBook> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])
  Object.assign(options)

  const res = await Book.paginate({ ...query }, options)

  return new ApiResponse(httpStatus.OK, 'getBooksHandler', res)
}

export async function getBookHandler(
  request: FastifyRequest<{
    Params: GetBookParam
  }>,
  reply: FastifyReply
) {
  const params = request.params

  const book = await Book.findById(params.id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Book not found')
  }

  return new ApiResponse(httpStatus.OK, 'getBookHandler', book)
}

export async function deleteBookHandler(
  request: FastifyRequest<{
    Params: DeleteBookParam
  }>,
  reply: FastifyReply
) {
  const params = request.params

  const book = await Book.findById(params.id)

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Book not found')
  }

  await book.deleteOne()

  return new ApiResponse(httpStatus.OK, 'deleteBookHandler', book)
}
