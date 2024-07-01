import mongoose, { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface ITransaction {
  transactionId: string
  transactionType: string
  status: string
  totalAmount: number
  nominal: number
  creditHistory: {
    from: number
    to: number
  }
  orders: [
    {
      id: mongoose.ObjectId
      orderId: string
      nominal: number
    }
  ]
  user: mongoose.ObjectId
  method: Object
  payment: {
    name: string
    data: any
    callback: any
  }
  hasSendNotification: boolean
  [key: string]: any
}

export interface ITransactionModel extends Model<ITransaction> {
  isExist(email: string, excludeRoleId?: string): Promise<ITransaction | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<ITransaction>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<ITransaction, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<ITransaction, {}, O>>>
}
