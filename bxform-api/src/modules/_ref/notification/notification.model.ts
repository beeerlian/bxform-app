import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { INotification, INotificationModel } from 'notification/notification.interfaces'
import { notificationTypes, notificationTypesEnum } from 'notification/notification.types'
import { toJSON } from 'utils/toJSON'

const notificationSchema = new mongoose.Schema<INotification, INotificationModel>(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    data: {
      type: Object
    },
    isRead: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: notificationTypesEnum,
      default: notificationTypes.NOTIFICATION
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON)
notificationSchema.plugin(paginate)

notificationSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

notificationSchema.statics.isNotificationNameTaken = async function (name, excludeNotificationId) {
  const notification = await this.findOne({ name, _id: { $ne: excludeNotificationId } })

  return !!notification
}

const Notification = mongoose.model<INotification, INotificationModel>('Notification', notificationSchema)

export default Notification
