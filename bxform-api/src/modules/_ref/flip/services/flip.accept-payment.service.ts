import { AxiosError } from 'axios'
import { IFlipCreateInvoiceBody } from 'modules/_ref/flip/others'
import flipApiClient from 'modules/_ref/flip/others/flip.api-client'
import { CreateBillInput, GetAllBillsQueryParam } from 'modules/flip-payment/flip-payment.schema'
import ApiError from 'utils/api-error'

const getAllBills = async (params: GetAllBillsQueryParam) => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).get('/pwf/bill', { params })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

const getBill = async (id: string) => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).get(`/pwf/bill/${id}/payment`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

const createBill = async (body: IFlipCreateInvoiceBody) => {
  try {
    const response = await flipApiClient({ apiVersion: 'apiUrlV2' }).post(`/pwf/bill`, body)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new ApiError(error.response.status, error.response.data.message, error.response.data)
    } else {
      throw new ApiError(400, 'Execute failed')
    }
  }
}

export { createBill, getAllBills, getBill }
