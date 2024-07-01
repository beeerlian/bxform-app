export const transactionStatus = {
  INITIAL: 'INITIAL',
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
}

export const transactionStatusEnum: string[] = Object.values(transactionStatus)

export const transactionTypes = {
  INSTALLMENT: 'installment'
}

export const transactionTypesEnum: string[] = Object.values(transactionTypes)
