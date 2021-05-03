FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.js ./


RUN npm install
COPY . .
RUN npm run build
RUN npm install -g pm2

CMD ["pm2-runtime", "ecosystem.config.js"]
