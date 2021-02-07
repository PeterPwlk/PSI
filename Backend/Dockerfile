FROM node:lts-alpine AS builder
WORKDIR /app
ADD . .
RUN cd ./Persistance && npm install
RUN cd ./web-api && npm install && npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/web-api/dist ./web-api/dist
COPY --from=builder /app/web-api/node_modules ./web-api/node_modules
COPY --from=builder /app/web-api/package.json ./web-api/package.json
COPY --from=builder /app/web-api/.env.production ./web-api/.env.production
COPY --from=builder /app/certs ./certs

EXPOSE 3000
CMD cd ./web-api && npm run start:prod
