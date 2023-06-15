FROM node:lts-alpine
LABEL authors="diamons"

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

copy public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]
