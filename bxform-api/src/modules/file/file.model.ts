import { IFile } from 'modules/file/file.interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    format: {
      type: String
    },
    key: {
      type: String
    },
    customId: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON)
fileSchema.plugin(paginate)

fileSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

fileSchema.statics.isFileNameTaken = async function (name, excludeFileId) {
  const file = await this.findOne({ name, _id: { $ne: excludeFileId } })

  return !!file
}

const FileModel = mongoose.model<IFile, mongoose.PaginateModel<IFile>>('File', fileSchema)

export default FileModel
