import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import ApiResponse from 'utils/api-response'

export const getPaymentMethodsHandler = async (
  request: FastifyRequest<{
    Body: {
      nominal: number
    }
  }>
) => {
  const { nominal } = request.body

  const paymentMethods = [
    {
      type: 'ewallet',
      name: 'E-Wallet',
      methods: [
        {
          id: 'xendit-ewallet-dana',
          provider: 'xendit',
          name: 'DANA',
          logo: 'payment-methods/dana.png',
          fee: 1.665,
          feeType: 'percentage',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          enabled: true
        },
        {
          id: 'xendit-ewallet-linkaja',
          provider: 'xendit',
          name: 'LinkAja',
          logo: 'payment-methods/linkaja.png',
          fee: 1.665,
          feeType: 'percentage',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          enabled: true
        },
        {
          id: 'xendit-ewallet-ovo',
          provider: 'xendit',
          name: 'OVO',
          logo: 'payment-methods/ovo.png',
          fee: 1.665,
          feeType: 'percentage',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          enabled: true
        },
        {
          id: 'xendit-ewallet-shopeepay',
          provider: 'xendit',
          name: 'ShopeePay',
          logo: 'payment-methods/shopeepay.png',
          fee: 2,
          feeType: 'percentage',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 1.665,
            feeType: 'percentage'
          }),
          enabled: true
        }
      ]
    },
    {
      type: 'retail-outlet',
      name: 'Retail Outlets (OTC)',
      methods: [
        {
          id: 'xendit-retail-outlet-alfamart',
          provider: 'xendit',
          name: 'Alfamart',
          logo: 'payment-methods/alfamart.png',
          fee: 5550,
          feeType: 'fixed',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 5550,
            feeType: 'fixed'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 5550,
            feeType: 'fixed'
          }),
          enabled: true
        },
        {
          id: 'xendit-retail-outlet-indomaret',
          provider: 'xendit',
          name: 'Indomaret',
          logo: 'payment-methods/indomaret.png',
          fee: 5550,
          feeType: 'fixed',
          calculatedAmountFee: calculatedAmountFee(nominal, {
            fee: 5550,
            feeType: 'fixed'
          }),
          totalAmount: calculatedTotalAmount(nominal, {
            fee: 5550,
            feeType: 'fixed'
          }),
          enabled: true
        }
      ]
    }
  ]

  return new ApiResponse(httpStatus.OK, 'OK', paymentMethods)
}

const calculatedAmountFee = (nominal, fee) => {
  if (fee.feeType === 'percentage') {
    return Number((nominal * (fee.fee / 100)).toFixed(0))
  }

  return fee.fee
}

const calculatedTotalAmount = (nominal, fee) => {
  if (fee.feeType === 'percentage') {
    return nominal + Number((nominal * (fee.fee / 100)).toFixed(0))
  }

  return nominal + fee.fee
}
