import config from 'configs/config'
import { createTunnel } from 'tunnel-ssh'
import logger from 'utils/logger'

export const viaSSHTunnel = async () => {
  const tunnelOptions = {
    autoClose: true
  }

  const serverOptions = {
    port: 27017
  }

  const sshOptions = {
    username: config.mongo.tunnel.username,
    host: config.mongo.tunnel.host,
    privateKey: config.mongo.tunnel.key,
    port: 22
  }

  const forwardOptions = {
    srcAddr: '127.0.0.1',
    srcPort: 27017,
    dstAddr: '127.0.0.1',
    dstPort: 27017
  }

  let [server] = await createTunnel(tunnelOptions, serverOptions, sshOptions, forwardOptions)

  server
    .on('connection', (connection: any) => {
      logger.verbose('🔗 SSH Connected')
    })
    .on('error', (connection: any) => {
      logger.error('❌ ssh connection failed')
    })
}
