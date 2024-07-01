import { ICart } from 'modules/cart/cart.interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { toJSON } from 'utils/toJSON'

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book'
        },
        qty: {
          type: Number,
          default: 1
        }
      }
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON)
cartSchema.plugin(paginate)

cartSchema.statics.isExist = async function (id) {
  const account = await this.findById(id)

  return !!account
}

cartSchema.statics.isCartNameTaken = async function (name, excludeCartId) {
  const cart = await this.findOne({ name, _id: { $ne: excludeCartId } })

  return !!cart
}

const Cart = mongoose.model<ICart, mongoose.PaginateModel<ICart>>('Cart', cartSchema)

export default Cart
