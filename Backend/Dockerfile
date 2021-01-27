FROM node:lts-alpine AS builder
WORKDIR /app
ADD . .
RUN cd ./Persistance && npm install
RUN cd ./web-api && npm install && npm build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/web-api/dist ./web-api/dist
COPY --from=builder /app/web-api/node_modules ./web-api/node_modules
COPY --from=builder /app/web-api/package.json ./web-api/package.json
COPY --from=builder /app/web-api/.env ./web-api/.env
EXPOSE 3000
CMD cd ./web-api && npm run start:prod
