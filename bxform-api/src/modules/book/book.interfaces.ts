import mongoose, { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface IBook {
  name: string
  price: number
  class: string
  semester: string
  description: string
  images: string[]
  createtBy: mongoose.ObjectId
  [key: string]: any
}

export interface IBookModel extends Model<IBook> {
  isExist(id: string): Promise<IBook | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IBook>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<IBook, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<IBook, {}, O>>>
}
