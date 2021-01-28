FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
CMD node server.js