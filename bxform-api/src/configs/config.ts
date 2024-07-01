import dotEnv from 'dotenv'
import 'dotenv/config'
import { readFileSync } from 'fs'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
import path from 'path'
import z from 'zod'

dotEnv.config({ path: `.env.${process.env.NODE_ENV}` })

const envVars = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  HOST: z.string(),
  FASTIFY_HTTPS_KEY_PATH: z.string(),
  FASTIFY_HTTPS_CERT_PATH: z.string(),
  MONGO_URI: z.string(),
  DB_TUNNEL_HOST: z.string(),
  DB_TUNNEL_KEY: z.string(),
  DB_TUNNEL_PORT: z.string(),
  DB_TUNNEL_USERNAME: z.string(),
  SECRET: z.string(),
  JWT_KEY_PATH: z.string(),
  JWT_PUBLIC_KEY_PATH: z.string(),
  CLIENT_URL: z.string(),
  CLIENT_URL_DASHBOARD: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_S3_URL: z.string(),
  XENDIT_PUBLIC_KEY: z.string(),
  XENDIT_SECRET_KEY: z.string(),
  FLIP_VALIDATION_KEY: z.string(),
  FLIP_SECRET_KEY: z.string(),
  FLIP_API_URL_V2: z.string(),
  FLIP_API_URL_V3: z.string(),
  FLIP_API_URL_KYC: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_KEY_PATH: z.string(),
  SMTP_HOST: z.string().nonempty(),
  SMTP_PORT: z.string().nonempty(),
  SMTP_USERNAME: z.string().nonempty(),
  SMTP_PASSWORD: z.string().nonempty(),
  EMAIL_FROM: z.string().nonempty(),
  SUPERADMIN_EMAIL: z.string().nonempty(),
  SUPERADMIN_PASSWORD: z.string().nonempty(),
  API_KEY: z.string().nonempty(),
  HOSTNAME: z.string().nonempty(),
  UPLOAD_DIR: z.string().nonempty(),
  PASSWORD_SECRET: z.string().nonempty()
})

const envResult = envVars.safeParse(process.env)

if (!envResult.success) {
  throw new Error(envResult.error.message)
}

const data = envResult.data

const smtp: SMTPConnection.Options = {
  host: data.SMTP_HOST,
  port: parseInt(data.SMTP_PORT),
  secure: data.NODE_ENV === 'production',
  auth: {
    user: data.SMTP_USERNAME,
    pass: data.SMTP_PASSWORD
  }
}

const config = {
  appName: 'coopsis',
  filesDir: path.join(__dirname, `../..${data.UPLOAD_DIR}`),
  env: data.NODE_ENV,
  passwordSecret: data.PASSWORD_SECRET,
  api: {
    port: data.PORT,
    host: data.HOST,
    https: {
      key: readFileSync(path.join(__dirname, `../..${data.FASTIFY_HTTPS_KEY_PATH}`)),
      cert: readFileSync(path.join(__dirname, `../..${data.FASTIFY_HTTPS_CERT_PATH}`))
    }
  },
  clientUrl: data.CLIENT_URL,
  clientUrlDashboard: data.CLIENT_URL_DASHBOARD,
  jwt: {
    secret: data.SECRET,
    privateKey: readFileSync(path.join(__dirname, `../..${data.JWT_KEY_PATH}`)),
    publicKey: readFileSync(path.join(__dirname, `../..${data.JWT_PUBLIC_KEY_PATH}`))
  },
  firebase: {
    apiKey: data.FIREBASE_API_KEY,
    keyPath: path.join(__dirname, `../..${data.FIREBASE_KEY_PATH}`)
  },
  mongo: {
    uri: data.MONGO_URI,
    tunnel: {
      host: data.DB_TUNNEL_HOST,
      key: data.DB_TUNNEL_KEY,
      port: data.DB_TUNNEL_PORT,
      username: data.DB_TUNNEL_USERNAME
    }
  },
  aws: {
    accessKeyId: data.AWS_ACCESS_KEY_ID,
    secretAccessKey: data.AWS_SECRET_ACCESS_KEY,
    region: data.AWS_REGION,
    bucketName: data.AWS_BUCKET_NAME,
    s3Url: data.AWS_S3_URL
  },
  xendit: {
    secretKey: data.XENDIT_SECRET_KEY,
    publicKey: data.XENDIT_PUBLIC_KEY
  },
  flip: {
    validationKey: data.FLIP_VALIDATION_KEY,
    secretKey: data.FLIP_SECRET_KEY,
    basicAuth: Buffer.from(`${data.FLIP_SECRET_KEY}:`).toString('base64'),
    apiUrlV2: data.FLIP_API_URL_V2,
    apiUrlV3: data.FLIP_API_URL_V3,
    apiUrlKyc: data.FLIP_API_URL_KYC
  },
  email: {
    smtp: smtp,
    from: data.EMAIL_FROM
  },
  superadmin: {
    email: data.SUPERADMIN_EMAIL,
    password: data.SUPERADMIN_PASSWORD
  },
  credential: {
    apiKey: data.API_KEY,
    hostName: data.HOSTNAME
  }
}

export default config
