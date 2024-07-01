class ApiResponse {
  statusCode: number
  message: string
  data?: any

  constructor(statusCode: number, message: string, data?: any) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }

  value() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    }
  }
}

export default ApiResponse
