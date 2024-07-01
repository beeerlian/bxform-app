export interface XendiInvoiceResponse {
  id?: string
  external_id?: string
  user_id?: string
  status?: string
  merchant_name?: string
  merchant_profile_picture_url?: string
  amount?: number
  description?: string
  expiry_date?: Date
  invoice_url?: string
  available_banks?: AvailableBank[]
  available_retail_outlets?: AvailableRetailOutlet[]
  available_ewallets?: AvailableEwallet[]
  available_qr_codes?: AvailableQrCode[]
  available_direct_debits?: AvailableDirectDebit[]
  available_paylaters?: AvailablePaylater[]
  should_exclude_credit_card?: boolean
  should_send_email?: boolean
  success_redirect_url?: string
  failure_redirect_url?: string
  created?: Date
  updated?: Date
  currency?: string
  customer?: Customer
  customer_notification_preference?: CustomerNotificationPreference
}

export interface AvailableBank {
  bank_code?: string
  collection_type?: string
  transfer_amount?: number
  bank_branch?: string
  account_holder_name?: string
  identity_amount?: number
}

export interface AvailableDirectDebit {
  direct_debit_type?: string
}

export interface AvailableEwallet {
  ewallet_type?: string
}

export interface AvailablePaylater {
  paylater_type?: string
}

export interface AvailableQrCode {
  qr_code_type?: string
}

export interface AvailableRetailOutlet {
  retail_outlet_name?: string
}

export interface Customer {
  email?: string
}

export interface CustomerNotificationPreference {
  invoice_created?: string[]
  invoice_reminder?: string[]
  invoice_expired?: string[]
  invoice_paid?: string[]
}
