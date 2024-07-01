// verify string is object id monggose

import mongoose from 'mongoose'

export function isObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id)
}
