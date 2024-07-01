import axios from 'axios'
import ApiError from 'utils/api-error'

export const briAuth = async () => {
  const url = '/oauth/client_credential/accesstoken?grant_type=client_credentials'

  const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const body = {
    client_id: 'li0lFd0UXWylb5iCZUJWAANmgfkHq29U',
    client_secret: 'SuS8K6MCRC7nGfN1'
  }

  let data

  await axios({
    method: 'POST',
    baseURL: 'https://sandbox.partner.api.bri.co.id',
    url: url,
    headers: header,
    data: body
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
