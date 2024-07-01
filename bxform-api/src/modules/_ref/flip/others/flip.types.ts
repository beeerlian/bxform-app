export type FlipBankStatus = 'OPERATIONAL' | 'DISTURBED' | 'HEAVILY_DISTURBED'
export type FlipApiVersion = 'apiUrlV3' | 'apiUrlV2' | 'apiUrlKyc'
export type FlipPaymentType = 'SINGLE' | 'MULTIPLE'

export interface IFlipAvailableBankResponse {
  bank_code?: string
  name?: string
  fee?: number
  queue?: string
  status?: FlipBankStatus
}
export interface IFlipGetBankAccountParam {
  code?: string
}

export interface IFlipCreateInvoiceBody {
  title: string
  type: FlipPaymentType
  amount: number
  expired_date?: string
  redirect_url?: string
  is_address_required?: number
  is_phone_number_required?: number
  step: number
  sender_name: string
  sender_email: string
  sender_phone_number: string
  sender_address?: string
  sender_bank: string
  sender_bank_type: string
}

export interface IFlipApiClientOptions {
  apiVersion: FlipApiVersion
}
