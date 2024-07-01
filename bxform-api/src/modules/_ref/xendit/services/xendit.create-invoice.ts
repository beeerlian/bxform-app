import config from 'configs/config'
import { XendiInvoiceResponse } from 'modules/_ref/xendit/others/xendit.types'
import x from 'xendit-node'

export interface ICreateXenditInvoice {
  trxId: string
  amount: number
  description: string
  customer: {
    name: string
    email: string
    mobileNumber: string
  }
}

export const xenditCreateInvoice = async (data: ICreateXenditInvoice) => {
  const {
    trxId,
    amount,
    description,
    customer: { name, email, mobileNumber }
  } = data

  const xendit = new x({
    secretKey: config.xendit.secretKey ?? ''
  })

  const { Invoice } = xendit
  const invoiceSpecificOptions = {}
  const i = new Invoice(invoiceSpecificOptions)

  const response: XendiInvoiceResponse = await i.createInvoice({
    externalID: trxId,
    amount,
    description,
    invoiceDuration: 86400,
    customer: {
      name,
      email,
      mobileNumber
    },
    customerNotificationPreference: {
      invoiceCreated: ['whatsapp', 'sms', 'email', 'viber'],
      invoiceReminder: ['whatsapp', 'sms', 'email', 'viber'],
      invoicePaid: ['whatsapp', 'sms', 'email', 'viber'],
      invoiceExpired: ['whatsapp', 'sms', 'email', 'viber']
    },
    successRedirectURL: `coopsis://app/trx?id=${trxId}`,
    failureRedirectURL: `coopsis://app/trx?id=${trxId}`,
    currency: 'IDR',
    shouldSendEmail: true
  })

  return response
}
