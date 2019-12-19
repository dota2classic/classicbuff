FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat
#ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

WORKDIR /opt/app
COPY . /opt/app

ARG API_URL=https://example.com/api

RUN API_URL=$API_URL yarn && yarn build

CMD [ "yarn", "start" ]

