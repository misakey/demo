FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.js ./


RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/index.js" ]
