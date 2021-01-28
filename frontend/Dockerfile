FROM node:lts-alpine as builder
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/certs ./certs

EXPOSE $PORT
CMD if [ "$SSL" == "true" ]; \
  then http-server dist -p $PORT -S -C $SSL_CERT -K $SSL_KEY; \
  else http-server dist -p $PORT; \
  fi
