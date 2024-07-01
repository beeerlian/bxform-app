import axios from 'axios'
import crypto from 'crypto'

import { briAuth } from 'bri/service/bri.auth'
import moment from 'moment'
import ApiError from 'utils/api-error'

export const briTransferAccount = async () => {
  const baseUrl = 'https://sandbox.partner.api.bri.co.id'
  const path = '/v3.1/transfer/internal/accounts'
  const timestamp = moment().utcOffset(0).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

  const token = await briAuth()

  if (!token) throw new ApiError(400, 'Token not found')

  const body = {
    sourceAccount: '888801000003301',
    beneficiaryAccount: '888801000157508'
  }

  // ** Generate signature sign with SHA256-HMAC

  const consumerSecret = 'SuS8K6MCRC7nGfN1'
  const payload = {
    path: path,
    verb: 'POST',
    token: `Bearer ${token.access_token}`,
    timestamp: timestamp,
    body: JSON.stringify(body)
  }

  const payloadString = `path=${payload.path}&verb=${payload.verb}&token=${payload.token}&timestamp=${payload.timestamp}&body=${payload.body}`
  const signature = crypto.createHmac('sha256', consumerSecret).update(payloadString).digest('base64')

  // ** Header
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token.access_token}`,
    'BRI-Timestamp': timestamp,
    'BRI-Signature': signature
  }

  let data

  await axios({
    method: 'POST',
    baseURL: baseUrl,
    url: path,
    headers: header,
    data: JSON.stringify(body)
  })
    .then(function (response) {
      data = response.data
    })
    .catch(function (error) {
      if (error.response) {
        throw new ApiError(error.response.status, error.response.data.message, error.response.data)
      } else {
        throw new ApiError(400, 'Execute failed')
      }
    })

  return data
}
