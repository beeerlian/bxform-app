import Book from 'book/book.model'
import Cart from 'cart/cart.model'
import { FastifyRequest } from 'fastify'
import Notification from 'notification/notification.model'
import Transaction from 'transaction/transaction.model'
import { transactionStatus } from 'transaction/transaction.types'
import ApiResponse from 'utils/api-response'

export const getHomeHandler = async (request: FastifyRequest<{}>) => {
  const { user } = request

  const book = await Book.find({}, {}, { limit: 12 })

  let cartCount = 0
  let notificationCount = 0
  let pendingPayment = null

  if (user) {
    const cart = await Cart.findOne({ user: user.id })

    if (cart) {
      cartCount = cart.items.length
    }

    notificationCount = await Notification.where({ user: user.id, read: false }).countDocuments()
    pendingPayment = await Transaction.findOne(
      { user: user.id, status: transactionStatus.PENDING },
      {},
      { sort: { createdAt: -1 } }
    )
  }

  return new ApiResponse(200, 'getHomeHandler', {
    book,
    cartCount,
    notificationCount,
    pendingPayment
  })
}
