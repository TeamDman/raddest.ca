FROM node:14.7.0-alpine3.10

WORKDIR /app

COPY app/package.json ./
COPY app/package-lock.json ./

ENV NODE_ENV=development
RUN npm install

CMD [""]