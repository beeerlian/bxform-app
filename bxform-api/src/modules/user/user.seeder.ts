import config from 'configs/config'
import { roleTypes } from 'configs/roles'
import { userStatusTypes } from 'user/user.types'
import { encryptPassword } from 'utils/enc-password'
import logger from 'utils/logger'
import User from './user.model'

const runUserSeeder = async () => {
  logger.info('🌱 Running user seed')

  const checkAdmin = await User.findOne({
    email: config.superadmin.email
  })

  if (!checkAdmin) {
    const { encryptedPassword, salt, iv } = encryptPassword(config.superadmin.password)

    User.create({
      nis: '0000000000',
      email: config.superadmin.email,
      role: roleTypes.SUPERADMIN,
      status: userStatusTypes.ACTIVE,
      profile: {
        name: 'Super Admin'
      },
      secret: {
        encryptedPassword,
        salt,
        iv
      }
    }).then(x => {
      logger.info(`Seeding superadmin : ${x}`)
    })
  } else {
    logger.info('🌻 User collection has data, skipping...')
  }
}

export { runUserSeeder }
