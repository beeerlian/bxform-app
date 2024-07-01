import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import * as flip from 'modules/_ref/flip'
import ApiResponse from 'utils/api-response'

export async function getBankInfoHandler(request: FastifyRequest<{}>) {
  const banks = await flip.getBankInfo({ code: 'gopay' })

  return new ApiResponse(httpStatus.OK, 'getBankInfo', banks)
}

export async function getIsMaintenanceHandler(request: FastifyRequest<{}>) {
  const result = await flip.getIsMaintenance()

  return new ApiResponse(httpStatus.OK, 'getIsMaintenance', result)
}

export async function getBalanceHandler(request: FastifyRequest<{}>) {
  const result = await flip.getBalance()

  return new ApiResponse(httpStatus.OK, 'getBalance', result)
}
