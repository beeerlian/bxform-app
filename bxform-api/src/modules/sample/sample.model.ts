import { ISample } from 'modules/sample/sample.interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const sampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
sampleSchema.plugin(toJSON)
sampleSchema.plugin(paginate)

sampleSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

sampleSchema.statics.isSampleNameTaken = async function (name, excludeSampleId) {
  const sample = await this.findOne({ name, _id: { $ne: excludeSampleId } })

  return !!sample
}

const Sample = mongoose.model<ISample, mongoose.PaginateModel<ISample>>('Sample', sampleSchema)

export default Sample
