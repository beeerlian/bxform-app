import { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface ISample {
  name: string
  email: string
}

export interface IOrganizationModel extends Model<ISample> {
  isEmailTaken(email: string, excludeRoleId?: string): Promise<ISample | null>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<ISample>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<ISample, {}, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<ISample, {}, O>>>
}
