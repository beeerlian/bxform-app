import Cart from 'cart/cart.model'
import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { IOrder, OrderItem } from 'modules/order/order.interfaces'
import Order from 'modules/order/order.model'
import { AcceptPickupSchema, GetOrderParam, GetOrdersQueryParam } from 'modules/order/order.schema'
import { orderStatusTypes } from 'modules/order/order.types'
import moment from 'moment'
import { FilterQuery, PaginateOptions } from 'mongoose'
import { sendNotificationAndSave } from 'notification/notification.service'
import { notificationTypes } from 'notification/notification.types'
import User from 'user/user.model'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export async function createOrderHandler(request: FastifyRequest<{}>, reply: FastifyReply) {
  const user = request.user

  const dateFormat = moment(Date.now()).format('YYMDHms')

  // Validation productsId
  let totalAmount = 0

  const carts = await Cart.findOne({ user: user.id }).populate('items.item')

  if (!carts) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found')
  }

  if (carts.items.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart is empty')
  }

  const items: OrderItem[] = []

  await Promise.all(
    carts.items.map(async item => {
      items.push({
        item: item.item['id'],
        price: item.item['price'],
        qty: item.qty
      })

      totalAmount += item.item['price'] * item.qty
    })
  )

  const newOrder = await Order.create({
    orderId: `ORDER-${dateFormat}${Math.floor(Math.random() * 10)}`,
    items: items,
    status: orderStatusTypes.REQUESTED,
    buyer: request.user.id,
    totalAmount: totalAmount,
    verificationCode: Math.floor(1000 + Math.random() * 9000),
    totalUnpaidAmount: totalAmount
  })

  if (newOrder) {
    await Cart.findOneAndUpdate({ user: user.id }, { items: [] })
  }

  await newOrder.populate([
    {
      path: 'buyer',
      select: 'nis name email token'
    },
    {
      path: 'items.item'
    }
  ])

  // Send Notification and Save
  if (newOrder.buyer.token.fcmToken) {
    sendNotificationAndSave({
      fcmToken: newOrder.buyer.token.fcmToken,
      data: {
        id: newOrder.id,
        identifier: 'order',
        url: `/home/order-detail?id=${newOrder.id}`,
        isRedirect: 'false'
      },
      title: 'Pesanan berhasil dibuat',
      body: `Silahkan status pesanan anda di menu catatan pesanan`,
      userId: newOrder.buyer.id,
      type: notificationTypes.ORDER
    })
  }

  return new ApiResponse(httpStatus.OK, 'createOrderHandler', newOrder)
}

export async function getOrderMeHandler(
  request: FastifyRequest<{
    Querystring: GetOrdersQueryParam
  }>
) {
  const user = request.user

  const orders = await Order.find({ buyer: user.id }).populate([
    {
      path: 'buyer',
      select: 'nis name email'
    },
    {
      path: 'items.item'
    }
  ])

  return new ApiResponse(httpStatus.OK, 'getOrderMeHandler', orders)
}

export async function getOrdersHandler(
  request: FastifyRequest<{
    Querystring: GetOrdersQueryParam
  }>
) {
  const query: FilterQuery<IOrder> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])

  Object.assign(options, {
    populate: [{ path: 'buyer', select: 'nis profile email' }]
  })

  const res = await Order.paginate({ ...query }, options)

  return new ApiResponse(httpStatus.OK, 'getOrdersHandler', res)
}

export async function getOrderHandler(
  request: FastifyRequest<{
    Params: GetOrderParam
  }>
) {
  const params = request.params

  const order = await Order.findById(params.id)
    .populate('buyer', 'nis profile email')
    .populate('items.item')
    .populate('acceptedBy', 'profile email')
    .populate('transactions.id')

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  return new ApiResponse(httpStatus.OK, 'getOrderHandler', order)
}

export async function acceptPickup(
  request: FastifyRequest<{
    Params: GetOrderParam
    Body: AcceptPickupSchema
  }>
) {
  const params = request.params
  const user = request.user
  const body = request.body

  const order: IOrder | null = await Order.findById(params.id)

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  const buyer = await User.findById(order.buyer)

  if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found')
  }

  if (body.verificationCode !== order.verificationCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kode verifikasi salah')
  }

  // Validation Order Status
  if (order.status !== orderStatusTypes.REQUESTED) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order status is not requested')
  }

  // Update Order
  Object.assign(order, {
    status: orderStatusTypes.ACTIVE,
    acceptedAt: Date.now(),
    acceptedBy: user.id
  })

  // Update User
  Object.assign(buyer, {
    balance: {
      ...buyer.balance,
      totalCredit: buyer.balance.totalCredit + order.totalAmount
    }
  })

  await order.save()
  await buyer.save()

  // Send Notification
  if (buyer.token.fcmToken) {
    sendNotificationAndSave({
      fcmToken: buyer.token.fcmToken,
      data: {
        id: order.id.toString(),
        identifier: 'order',
        url: `/home/order-detail?id=${order.id}`,
        isRedirect: 'true'
      },
      title: 'Pesanan berhasil diambil',
      body: `Silahkan status pesanan anda di menu catatan pesanan`,
      userId: buyer.id,
      type: notificationTypes.ORDER
    })
  }

  return new ApiResponse(httpStatus.OK, 'resuestPickup Successfully', order)
}
