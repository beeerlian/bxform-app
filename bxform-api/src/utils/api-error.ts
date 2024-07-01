class ApiError extends Error {
  statusCode: number
  message: string
  data?: any
  isOperational: boolean

  constructor(statusCode: number, message: string, data?: any, isOperational = true, stack = '') {
    super(message)

    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
