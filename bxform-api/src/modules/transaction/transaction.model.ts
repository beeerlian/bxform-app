import { ITransaction, ITransactionModel } from 'modules/transaction/transaction.interfaces'
import {
  transactionStatus,
  transactionStatusEnum,
  transactionTypes,
  transactionTypesEnum
} from 'modules/transaction/transaction.types'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const transactionSchema = new mongoose.Schema<ITransaction, ITransactionModel>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    transactionType: {
      type: String,
      required: true,
      enum: transactionTypesEnum,
      default: transactionTypes.INSTALLMENT
    },
    status: {
      type: String,
      required: true,
      enum: transactionStatusEnum,
      default: transactionStatus.INITIAL
    },
    totalAmount: {
      type: Number,
      required: true
    },
    nominal: {
      type: Number,
      required: true
    },
    creditHistory: {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      }
    },
    orders: [
      {
        id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Order'
        },
        orderId: {
          type: String,
          required: true
        },
        nominal: {
          type: Number,
          required: true
        }
      }
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    hasSendNotification: {
      type: Boolean,
      default: false
    },
    method: {
      type: Map
    },
    payment: {
      name: {
        type: String,
        required: true
      },
      data: {
        type: Map
      }
    },
    sha: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON)
transactionSchema.plugin(paginate)

transactionSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

transactionSchema.statics.isTransactionNameTaken = async function (name, excludeTransactionId) {
  const transaction = await this.findOne({ name, _id: { $ne: excludeTransactionId } })

  return !!transaction
}

const Transaction = mongoose.model<ITransaction, ITransactionModel>('Transaction', transactionSchema)

export default Transaction
