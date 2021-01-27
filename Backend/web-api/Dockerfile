FROM node:12.3-alpine AS builder
WORKDIR /backend/web-api
ADD ./Backend/web-api/package.json ./package.json
ADD ./Backend/web-api .
ADD ./Backend/Persistance/ /backend/Persistance
RUN cd /backend/Persistance && npm install && cd -
RUN npm install
RUN npm run build

FROM node:12.3-alpine
WORKDIR /backend/web-api
COPY --from=builder /backend/web-api ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
