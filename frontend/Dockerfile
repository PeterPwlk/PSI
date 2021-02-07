FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
RUN rm /app/.env.development
RUN yarn
RUN yarn build
CMD node server.js
