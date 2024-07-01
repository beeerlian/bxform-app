import { roleTypes } from 'configs/roles'
import { IUser, IUserModel, userStatus, userStatusTypes } from 'modules/user/user.types'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { toJSON } from 'utils/toJSON'

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    nis: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      default: null
    },
    email: {
      type: String,
      lowercase: true,
      default: null
    },
    role: {
      type: String,
      required: true,
      enum: roleTypes,
      default: 'user'
    },
    status: {
      type: String,
      enum: userStatus,
      default: userStatusTypes.UNREGISTERED,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    token: {
      tempToken: {
        type: String,
        default: null
      },
      fcmToken: {
        type: String,
        default: null
      }
    },
    balance: {
      totalCredit: {
        type: Number,
        default: 0
      }
    },
    secret: {
      salt: {
        type: String,
        default: null
      },
      iv: {
        type: String,
        default: null
      },
      encryptedPassword: {
        type: String,
        default: null
      }
    },
    profile: {
      name: {
        required: true,
        type: String
      },
      kelas: {
        type: String
      },
      avatar: {
        type: String,
        default: null
      }
    }
  },
  {
    timestamps: true
  }
)

userSchema.plugin(toJSON)
userSchema.plugin(paginate)

userSchema.static('isExist', async function (id) {
  const exist = await this.findById(id)

  return !!exist
})

userSchema.static('isEmailTaken', async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })

  return !!user
})

const User = mongoose.model<IUser, IUserModel>('User', userSchema)

export default User
