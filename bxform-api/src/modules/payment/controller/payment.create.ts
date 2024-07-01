import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { xenditEWalletCharge } from 'modules/_ref/xendit/services/xendit.ewallet-charge'
import Order from 'modules/order/order.model'
import { orderStatusTypes } from 'modules/order/order.types'
import moment from 'moment'
import { CreatePaymentSchema } from 'payment/payment.schema'
import { transactionStatus, transactionTypes } from 'transaction/transaction.types'
import { transactionCreate } from 'transaction/utils/transaction.create'
import User from 'user/user.model'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

async function createPaymentHandler(
  request: FastifyRequest<{
    Body: CreatePaymentSchema
  }>
) {
  const body = request.body

  const dateFormat = moment(Date.now()).format('YYMDHms')

  // ** Restrict user to create payment if user dont have pending transaction
  // ** Find user orders to check if user dont have pending transaction
  const userOrders = await Order.find({
    buyer: request.user.id,
    status: orderStatusTypes.ACTIVE
  })

  if (userOrders.length < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Mohon maaf, anda tidak memiliki transaksi yang sedang berjalan')
  }

  // ** Validate payment method and provider
  if (body.method.provider !== 'xendit') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provider tidak ditemukan')
  }

  // ** Find user
  const user = await User.findById(request.user.id)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User tidak ditemukan')
  }

  const transactionId = `COOPSIS-${dateFormat}${Math.floor(Math.random() * 10)}`

  // ** Create transaction
  const transaction = await transactionCreate({
    totalAmount: body.method.totalAmount,
    nominal: body.method.nominal,
    userOrders: userOrders ?? [],
    transactionId: transactionId,
    type: transactionTypes.INSTALLMENT,
    user: user,
    method: body.method,
    paymentData: null
  })

  if (!transaction) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gagal membuat transaksi, silahkan coba lagi nanti')
  }

  let paymentData: any

  // ** Create xendit payment
  if (body.method.provider === 'xendit') {
    if (body.method.id.includes('ewallet')) {
      paymentData = await xenditEWalletCharge({
        transactionId,
        totalAmount: body.method.totalAmount,
        nominal: body.method.nominal,
        eWalletCode: body.method.id,
        customer: {
          mobileNumber: user.phone
        }
      })
    }
  }

  if (!paymentData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Gagal membuat payment, silahkan coba lagi nanti')
  }

  if (paymentData) {
    transaction.payment = {
      name: body.method.name,
      data: paymentData
    }

    transaction.status = transactionStatus.PENDING
    await transaction.save()
  }

  return new ApiResponse(httpStatus.CREATED, 'Payment berhasil dibuat', transaction)
}

export { createPaymentHandler }
