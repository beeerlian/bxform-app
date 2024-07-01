import mongoose, { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface OrderItem {
  item: mongoose.ObjectId
  price: number
  qty: number
}

export interface IOrder {
  orderId: string
  items: OrderItem[]
  buyer: mongoose.ObjectId
  status: string
  totalAmount: number
  activity: Map<string, string>[]
  verificationCode: string
  acceptedAt: Date
  acceptedBy: mongoose.ObjectId
  totalUnpaidAmount: number
  totalPaidAmount: number
  transactions: [
    {
      id: {
        type: mongoose.ObjectId
        ref: 'Transaction'
      }
      paidedAmount: {
        type: Number
      }
      updatedAt: {
        type: Date
      }
    }
  ]
  [key: string]: any
}

export interface IOrderModel extends Model<IOrder> {
  isExist(email: string, excludeRoleId?: string): Promise<IOrder | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IOrder>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<IOrder, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<IOrder, {}, O>>>
}
