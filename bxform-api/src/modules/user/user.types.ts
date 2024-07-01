import mongoose, { FilterQuery, Model, PaginateDocument, PaginateOptions, PaginateResult } from 'mongoose'

export interface IUser extends Document {
  id: mongoose.Types.ObjectId
  nis: string
  phone: string
  email: string
  role: string
  status: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
  profile: {
    name: string
    avatar: string
    kelas: string
  }
  token: {
    tempToken: string
    fcmToken: string
  }
  secret: {
    salt: string
    iv: string
    encryptedPassword: string
  }
  balance: {
    totalCredit: number
  }
  [key: string]: any
}

export interface IUserDoc extends IUser, Document {}

export interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>
  paginate<O extends PaginateOptions>(
    query?: FilterQuery<IUser>,
    options?: O,
    callback?: (err: any, result: PaginateResult<PaginateDocument<IUser, IUserDoc, O>>) => void
  ): Promise<PaginateResult<PaginateDocument<IUser, IUserDoc, O>>>
}

export const userStatusTypes = {
  ACTIVE: 'active',
  UNREGISTERED: 'unregistered',
  WAITING_VERIFICATION: 'waiting_verification',
  INACTIVE: 'inactive',
  DISABLED: 'disabled',
  DELETED: 'deleted',
  BANNED: 'banned'
}

export const userStatus: string[] = Object.values(userStatusTypes)
