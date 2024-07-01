export const orderStatusTypes = {
  ACTIVE: 'active',
  REQUESTED: 'requested',
  WAITING_PICKUP: 'waiting_pickup',
  CANCELLED: 'cancelled',
  FINISHED: 'finished',
  DELETED: 'deleted'
}

export const orderStatus: string[] = Object.values(orderStatusTypes)

export const orderProductTypes = {
  BOOK: 'book'
}

export const productTypesEnum: string[] = Object.values(orderProductTypes)
