import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import * as flip from 'modules/_ref/flip'
import { CreateBillInput, GetAllBillsQueryParam, GetBillParam } from 'modules/flip-payment/flip-payment.schema'
import moment from 'moment'
import Order from 'order/order.model'
import { orderStatusTypes } from 'order/order.types'
import { transactionStatus, transactionTypes } from 'transaction/transaction.types'
import { transactionCreate } from 'transaction/utils/transaction.create'
import User from 'user/user.model'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export async function getAllBillsHandler(
  request: FastifyRequest<{
    Querystring: GetAllBillsQueryParam
  }>
) {
  const results = await flip.getAllBills(request.query)

  return new ApiResponse(httpStatus.OK, 'getAllBillsHandler', results)
}

export async function getBillHandler(
  request: FastifyRequest<{
    Params: GetBillParam
  }>
) {
  const bill = await flip.getBill(request.params.id)

  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Bill not found')
  }

  return new ApiResponse(httpStatus.OK, 'getBillHandler', bill)
}

export async function createBillHandler(
  request: FastifyRequest<{
    Body: CreateBillInput
  }>
) {
  const body = request.body

  const dateFormat = moment(Date.now()).format('YYMDHms')
  // ** Check if the given bankCode is available/the status is OPERATIONAL
  // ** if unavailable, create payment process will be terminated

  const banks = await flip.getBankInfo({ code: body.method.bankCode })
  if (banks.length < 0 || banks[0].status != 'OPERATIONAL') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Mohon maaf, metode pembayaran yang anda pilih sedang tidak tersedia saat ini'
    )
  }

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
  if (body.method.provider !== 'flip') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provider tidak didukung')
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

  let paymentData: any;

  // ** Create xendit payment
  if (body.method.provider === 'flip') {
    const transactionData = transaction.toObject()
    const userData = user.toObject()
    paymentData = await flip.createBill({
      title: transactionData.transactionId,
      amount: transactionData.totalAmount,
      is_address_required: 0,
      is_phone_number_required: 1,
      sender_bank: body.method.bankCode,
      sender_bank_type: body.method.bankType,
      sender_email: userData.email,
      sender_phone_number: userData.phone,
      sender_name: userData.nis,
      step: 3,
      type: 'SINGLE'
    })
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
