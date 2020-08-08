FROM node:14.7.0-alpine3.10

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /app


COPY app/package.json ./
COPY app/package-lock.json ./


ENV NODE_ENV=development
RUN npm install

COPY app/ ./

CMD ["scripts/start.sh"]