import { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface INotification {
  title: string
  body: string
  imageUrl: string
  [key: string]: any
}

export interface INotificationModel extends Model<INotification> {
  isExist(email: string, excludeRoleId?: string): Promise<INotification | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<INotification>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<INotification, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<INotification, {}, O>>>
}
