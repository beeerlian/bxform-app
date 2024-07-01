import { briTransfer } from 'bri/service/bri.transfer'
import { briTransferAccount } from 'bri/service/bri.transfer.account'
import { briTransferCheck } from 'bri/service/bri.transfer.check'
import { FastifyInstance } from 'fastify'
import { briAuth } from 'modules/_ref/bri/service/bri.auth'

async function briRoutes(server: FastifyInstance) {
  server.post('/test/auth', {}, briAuth)
  server.post('/test/transfer/accounts', {}, briTransferAccount)
  server.post('/test/transfer', {}, briTransfer)
  server.post('/test/transfer/check', {}, briTransferCheck)
}

export default briRoutes
