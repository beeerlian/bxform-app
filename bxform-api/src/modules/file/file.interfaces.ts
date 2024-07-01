import { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface IFile {
  name: string
  email: string
}

export interface IOrganizationModel extends Model<IFile> {
  isEmailTaken(email: string, excludeRoleId?: string): Promise<IFile | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IFile>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<IFile, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<IFile, {}, O>>>
}

export interface MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
