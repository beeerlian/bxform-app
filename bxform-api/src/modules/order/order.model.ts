import { IOrder, IOrderModel } from 'modules/order/order.interfaces'
import { orderStatus, orderStatusTypes } from 'modules/order/order.types'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const orderSchema = new mongoose.Schema<IOrder, IOrderModel>(
  {
    orderId: {
      type: String,
      required: true,
      trim: true
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book'
        },
        price: {
          type: Number
        },
        qty: {
          type: Number
        }
      }
    ],
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: orderStatus,
      default: orderStatusTypes.REQUESTED,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    totalUnpaidAmount: {
      type: Number,
      required: true,
      default: 0
    },
    totalPaidAmount: {
      type: Number,
      required: true,
      default: 0
    },
    verificationCode: {
      type: String,
      required: true
    },
    acceptedAt: {
      type: Date
    },
    acceptedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    transactions: [
      {
        id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Transaction'
        },
        paidedAmount: {
          type: Number
        },
        updatedAt: {
          type: Date
        }
      }
    ],
    activity: [Map]
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON)
orderSchema.plugin(paginate)

orderSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

orderSchema.statics.isOrderNameTaken = async function (name, excludeOrderId) {
  const order = await this.findOne({ name, _id: { $ne: excludeOrderId } })

  return !!order
}

const Order = mongoose.model<IOrder, IOrderModel>('Order', orderSchema)

export default Order
