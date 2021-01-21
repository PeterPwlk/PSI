FROM node:12.3-alpine
WORKDIR /backend/web-api
ADD ./Backend/web-api/package.json ./package.json
ADD ./Backend/web-api .
ADD ./Backend/Persistance/ /backend/Persistance
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]

