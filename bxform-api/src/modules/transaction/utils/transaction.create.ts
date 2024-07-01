import httpStatus from 'http-status'
import Transaction from 'transaction/transaction.model'
import { transactionStatus } from 'transaction/transaction.types'
import ApiError from 'utils/api-error'

export interface ICreateTransaction {
  totalAmount: number
  nominal: number
  userOrders: any[]
  transactionId: string
  type: string
  user: any
  method: any
  paymentData: any
}

export const transactionCreate = async ({
  totalAmount,
  nominal,
  userOrders,
  transactionId,
  type,
  user,
  method,
  paymentData
}: ICreateTransaction) => {
  if (!user || !userOrders || !transactionId || !type || !method) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Missing required parameters')
  }

  // ** Calculate every single order can be paid
  let nominalTransaction = nominal
  const orders: any[] = []

  await Promise.all(
    userOrders.map(async order => {
      if (nominalTransaction > 0) {
        if (order) {
          const orderUnpaidAmount = order.totalUnpaidAmount

          if (orderUnpaidAmount <= nominalTransaction) {
            orders.push({
              id: order.id,
              orderId: order.orderId,
              nominal: orderUnpaidAmount
            })

            nominalTransaction = nominalTransaction - orderUnpaidAmount
          } else {
            orders.push({
              id: order.id,
              orderId: order.orderId,
              nominal: nominalTransaction
            })

            nominalTransaction = 0
          }
        }
      }
    })
  )

  // ** Write transaction to database
  const transaction = await Transaction.create({
    transactionId: transactionId,
    totalAmount: totalAmount,
    nominal: nominal,
    type: type,
    status: transactionStatus.PENDING,
    user: user.id,
    creditHistory: {
      from: user.balance.totalCredit,
      to: user.balance.totalCredit - nominal
    },
    orders: orders,
    method: method,
    payment: {
      name: method.provider ?? '',
      data: paymentData
    }
  })

  return transaction
}
