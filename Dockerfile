FROM mhart/alpine-node:12.22.3

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache make gcc g++ python

COPY . .

RUN npm ci

RUN npm run build:tsc

CMD [ "npx", "knex", "migrate:latest" ,"&&", "npm", "start" ]