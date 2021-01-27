FROM node:lts-alpine AS builder
WORKDIR /app
ADD . .
RUN cd ./Persistance && npm install
RUN cd ./web-api && npm install && npm build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/web-api/dist ./
COPY --from=builder /app/web-api/node_modules ./
COPY --from=builder /app/web-api/package.json ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
