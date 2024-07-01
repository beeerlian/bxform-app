import mongoose, { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

interface CartItem {
  item: string
  qty: number
}

export interface ICart {
  items: CartItem[]
  user: mongoose.Schema.Types.ObjectId
}

export interface IOrganizationModel extends Model<ICart> {
  isExist(email: string, excludeRoleId?: string): Promise<ICart | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<ICart>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<ICart, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<ICart, {}, O>>>
}
