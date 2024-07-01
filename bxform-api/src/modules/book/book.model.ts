import { IBook, IBookModel } from 'modules/book/book.interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const bookSchema = new mongoose.Schema<IBook, IBookModel>(
  {
    itemType: {
      type: String,
      default: 'book'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      default: 1000,
      min: 1000,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    images: [
      {
        type: String
      }
    ],
    createtBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON)
bookSchema.plugin(paginate)

bookSchema.statics.isExist = async function (id) {
  const book = await this.findById(id)

  return !!book
}

bookSchema.statics.isBookNameTaken = async function (name, excludeBookId) {
  const book = await this.findOne({ name, _id: { $ne: excludeBookId } })

  return !!book
}

const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema)

export default Book
