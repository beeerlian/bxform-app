import config from 'configs/config'
import x from 'xendit-node'

export interface ICreateXenditInvoice {
  transactionId: string
  totalAmount: number
  nominal: number
  eWalletCode: string
  customer: {
    mobileNumber: string
  }
}

export const xenditEWalletCharge = async (data: ICreateXenditInvoice) => {
  const {
    transactionId,
    totalAmount,
    nominal,
    eWalletCode,
    customer: { mobileNumber }
  } = data

  const xendit = new x({
    secretKey: config.xendit.secretKey ?? ''
  })

  const { EWallet } = xendit
  const ewalletSpecificOptions = {}
  const ew = new EWallet(ewalletSpecificOptions)

  let channelCode
  let currency

  switch (eWalletCode) {
    case 'xendit-ewallet-ovo':
      channelCode = 'ID_OVO'
      break
    case 'xendit-ewallet-dana':
      channelCode = 'ID_DANA'
      break
    case 'xendit-ewallet-linkaja':
      channelCode = 'ID_LINKAJA'
      break
    case 'xendit-ewallet-shopeepay':
      channelCode = 'ID_SHOPEEPAY'
      break
    default:
      break
  }

  currency = 'IDR'

  const resp = await ew.createEWalletCharge({
    referenceID: transactionId,
    currency,
    amount: totalAmount,
    checkoutMethod: 'ONE_TIME_PAYMENT',
    channelCode,
    channelProperties: {
      mobileNumber,
      successRedirectURL: `https://coopsis.co/payment-success/${transactionId}`
    },
    metadata: {
      nominal: nominal
    }
  })

  return resp
}
