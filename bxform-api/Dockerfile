# development stage
FROM --platform=linux/amd64 node:18-alpine as production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock tsconfig.json .env.production nodemon.json ./

COPY ./src ./src

RUN chown node -R /app

RUN ls -a

RUN yarn install --frozen-lockfile --pure-lockfile --production && yarn build

RUN mkdir -p /app/keypair

COPY keypair/ /app/keypair/

RUN mkdir -p /app/uploads

ENV NODE_ENV=production
