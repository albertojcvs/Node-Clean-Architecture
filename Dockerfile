FROM node:17

WORKDIR /usr/app

COPY package.json .

RUN yarn --production=true

COPY ./dist ./dist
