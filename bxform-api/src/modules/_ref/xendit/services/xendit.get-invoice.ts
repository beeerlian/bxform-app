import config from 'configs/config'
import { XendiInvoiceResponse } from 'modules/_ref/xendit/others/xendit.types'
import x from 'xendit-node'

export interface IGetXenditInvoice {
  invoiceId: string
}

export const xenditGetInvoice = async (data: IGetXenditInvoice) => {
  const { invoiceId } = data

  const xendit = new x({
    secretKey: config.xendit.secretKey ?? ''
  })

  const { Invoice } = xendit
  const invoiceSpecificOptions = {}
  const i = new Invoice(invoiceSpecificOptions)

  const response: XendiInvoiceResponse = await i.getInvoice({
    invoiceID: invoiceId
  })

  return response
}
