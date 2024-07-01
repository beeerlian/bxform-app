import config from 'configs/config'
import x from 'xendit-node'

export interface IXenditEWalletChargeStatus {
  chargeId: string
}

export const xenditEWalletChargeStatus = async (data: IXenditEWalletChargeStatus) => {
  const { chargeId } = data

  const xendit = new x({
    secretKey: config.xendit.secretKey ?? ''
  })

  const { EWallet } = xendit
  const ewalletSpecificOptions = {}
  const ew = new EWallet(ewalletSpecificOptions)

  const resp = await ew.getEWalletChargeStatus({
    chargeID: chargeId
  })

  return resp
}
