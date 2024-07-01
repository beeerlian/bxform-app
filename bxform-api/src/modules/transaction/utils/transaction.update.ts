import CurrencyFormatter from 'currency-formatter'
import httpStatus from 'http-status'
import { sendNotificationAndSave } from 'notification/notification.service'
import { notificationTypes } from 'notification/notification.types'
import Order from 'order/order.model'
import { orderStatusTypes } from 'order/order.types'
import { ITransaction } from 'transaction/transaction.interfaces'
import Transaction from 'transaction/transaction.model'
import { transactionStatus } from 'transaction/transaction.types'
import User from 'user/user.model'
import ApiError from 'utils/api-error'

export interface IUpdateTransaction {
  transactionId: string
  nominal: number
  status: string
  payment: any
}

export const handleUpdateTransaction = async ({ transactionId, nominal, status, payment }: IUpdateTransaction) => {
  // ** Find Transaction and update status
  const transaction: ITransaction | null = await Transaction.findOne({ transactionId })

  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaksi tidak ditemukan')
  }

  // ** Revoked if status failed
  if (status === transactionStatus.FAILED) {
    Object.assign(transaction, {
      status,
      payment: {
        ...transaction.payment,
        data: payment
      }
    })

    await transaction.save()

    return transaction
  }

  // ** Revoked if status unpaid
  if (status !== transactionStatus.PAID) {
    return transaction
  }

  // ** Revoked if transaction already paid
  if (transaction.status === transactionStatus.PAID) {
    return transaction
  }

  // ** Get User
  const user = await User.findById(transaction.user)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')
  }

  // ** Update Transaction Orders
  let nominalTransaction = nominal
  await Promise.all(
    transaction.orders.map(async order => {
      if (nominalTransaction > 0) {
        const orderDoc = await Order.findById(order.id)

        if (orderDoc) {
          const orderUnpaidAmount = orderDoc.totalUnpaidAmount

          if (nominalTransaction >= orderUnpaidAmount) {
            Object.assign(orderDoc, {
              status: orderStatusTypes.FINISHED,
              totalPaidAmount: orderDoc.totalPaidAmount + orderUnpaidAmount,
              totalUnpaidAmount: 0,
              transactions: [
                ...orderDoc.transactions,
                {
                  id: transaction.id,
                  paidedAmount: orderUnpaidAmount,
                  updatedAt: new Date()
                }
              ]
            })

            nominalTransaction = nominalTransaction - orderUnpaidAmount
          } else {
            Object.assign(orderDoc, {
              status: orderStatusTypes.ACTIVE,
              totalPaidAmount: orderDoc.totalPaidAmount + nominalTransaction,
              totalUnpaidAmount: orderUnpaidAmount - nominalTransaction,
              transactions: [
                ...orderDoc.transactions,
                {
                  id: transaction.id,
                  paidedAmount: nominalTransaction,
                  updatedAt: new Date()
                }
              ]
            })

            nominalTransaction = 0
          }

          await orderDoc.save()
        }
      }
    })
  )

  // ** Update Transaction
  const newTransaction: ITransaction | null = await Transaction.findOneAndUpdate(
    { transactionId },
    {
      payment: {
        ...transaction.payment,
        data: payment
      },
      status
    },
    { new: true }
  )

  // ** Update User Balance
  await User.findOneAndUpdate(
    {
      _id: user.id
    },
    {
      balance: {
        ...user.balance,
        totalCredit: user.balance.totalCredit - (nominal ?? 0)
      }
    },
    { new: true }
  )

  if (newTransaction && newTransaction.hasSendNotification === false) {
    if (user.token.fcmToken) {
      // ** Update Transaction hasSendNotification
      await Transaction.findOneAndUpdate(
        { transactionId },
        {
          hasSendNotification: true
        }
      )

      const withCurrency = CurrencyFormatter.format(newTransaction.totalAmount, { code: 'IDR' })

      sendNotificationAndSave({
        fcmToken: user.token.fcmToken,
        data: {
          transactionId: newTransaction.transactionId.toString(),
          status: newTransaction.status.toString(),
          type: notificationTypes.TRANSACTION.toString()
        },
        title: 'Pembayaran berhasil',
        body: `Pembayaran sebesar ${withCurrency} berhasil dilakukan`,
        userId: user.id,
        type: notificationTypes.TRANSACTION
      })
    }
  }

  return newTransaction
}
