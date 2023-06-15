FROM node:lts-alpine
LABEL authors="diamons"

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

EXPOSE 8080

CMD ["npm", "start"]
