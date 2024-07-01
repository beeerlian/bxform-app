import { AxiosError } from 'axios'
import { IFlipGetBankAccountParam } from 'modules/_ref/flip'
import flipApiClient from 'modules/_ref/flip/others/flip.api-client'
import ApiError from 'utils/api-error'

const getBankInfo = async (params?: IFlipGetBankAccountParam) => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).get('/general/banks', { params })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

const getBalance = async () => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).get('/general/balance')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

const getIsMaintenance = async () => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).get('/general/maintenance')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

export { getBalance, getBankInfo, getIsMaintenance }
