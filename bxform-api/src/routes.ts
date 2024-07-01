import authRoutes from 'auth/auth.route'
import briRoutes from 'bri/bri.route'
import cartRoutes from 'cart/cart.route'
import { FastifyInstance } from 'fastify'
import bookRoutes from 'modules/book/book.route'
import fileRoutes from 'modules/file/file.route'
import flipPaymentRoutes from 'modules/flip-payment/flip-payment.route'
import homeRoutes from 'modules/home/home.route'
import orderRoutes from 'modules/order/order.route'
import paymentRoutes from 'modules/payment/payment.route'
import transactionRoutes from 'modules/transaction/transaction.route'
import notificationsRoutes from 'notification/notification.route'
import sampleRoutes from 'sample/sample.route'
import userRoutes from 'user/user.route'

const routes = (server: FastifyInstance, opts: any, next: any) => {
  server.register(authRoutes, { prefix: '/auth' })
  server.register(bookRoutes, { prefix: '/book' })
  server.register(sampleRoutes, { prefix: '/sample' })
  server.register(fileRoutes, { prefix: '/file' })
  server.register(userRoutes, { prefix: '/user' })
  server.register(orderRoutes, { prefix: '/order' })
  server.register(transactionRoutes, { prefix: '/transaction' })
  server.register(cartRoutes, { prefix: '/cart' })
  server.register(notificationsRoutes, { prefix: '/notification' })
  server.register(paymentRoutes, { prefix: '/payment' })
  server.register(homeRoutes, { prefix: '/home' })
  server.register(briRoutes, { prefix: '/bri' })
  server.register(flipPaymentRoutes, { prefix: '/flip-payment' })

  next()
}

export default routes
