FROM node:lts-alpine AS builder
WORKDIR /backend/web-api
ADD ./package.json ./package.json
ADD . .
RUN npm install
RUN cd ../Persistance
ADD . /backend/Persistance
RUN cd /backend/Persistance && npm install && cd -
RUN npm run build

FROM node:lts-alpine
WORKDIR /backend/web-api
COPY --from=builder /backend/web-api ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
