import axios from 'axios'
import config from 'configs/config'
import { IFlipApiClientOptions } from 'modules/_ref/flip/others/flip.types'

const flipApiClient = (options: IFlipApiClientOptions) => {
  const headers = {
    Authorization: 'Basic ' + config.flip.basicAuth
  }

  return axios.create({
    baseURL: config.flip[options.apiVersion],
    headers
  })
}

export default flipApiClient
