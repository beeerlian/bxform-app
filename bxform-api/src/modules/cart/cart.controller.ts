import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { ICart } from 'modules/cart/cart.interfaces'
import Cart from 'modules/cart/cart.model'
import { GetCartParam, GetCartsQueryParam, UpdateCartInput } from 'modules/cart/cart.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiResponse from 'utils/api-response'

export async function updateCartHandler(
  request: FastifyRequest<{
    Body: UpdateCartInput
  }>,
  reply: FastifyReply
) {
  const body = request.body
  const user = request.user

  const cart = await Cart.findOne({ user: user.id })

  if (!cart) {
    const newCart = await Cart.create({
      user: user.id,
      items: [
        {
          item: body.item,
          qty: 1
        }
      ]
    })

    return new ApiResponse(httpStatus.OK, 'updateCart', newCart)
  }

  let items = [...cart.items]

  // find index of item in cart
  const index = items.findIndex(item => item.item == body.item)

  if (index == -1) {
    items.push({
      item: body.item,
      qty: 1
    })
  } else {
    items = items.filter(item => item.item != body.item)
  }

  Object.assign(cart, { items })

  await cart.save()

  await cart.populate('items.item')

  return new ApiResponse(httpStatus.OK, 'createCartHandler', cart)
}

export async function getCartOwner(
  request: FastifyRequest<{
    Params: GetCartParam
  }>,
  reply: FastifyReply
) {
  const user = request.user

  const cart = await Cart.findOne({
    user: user.id
  }).populate('items.item')

  if (!cart) {
    const newCart = await Cart.create({
      user: user.id,
      items: []
    })

    return new ApiResponse(httpStatus.OK, 'getCartOwner', newCart)
  }

  return new ApiResponse(httpStatus.OK, 'getCartHandler', cart)
}

export async function getCartsHandler(
  request: FastifyRequest<{
    Querystring: GetCartsQueryParam
  }>
) {
  const query: FilterQuery<ICart> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])
  Object.assign(options)

  const res = await Cart.paginate({ ...query }, options)

  return new ApiResponse(httpStatus.OK, 'getCartsHandler', res)
}
