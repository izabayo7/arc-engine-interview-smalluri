FROM node:18-alpine AS base

ENV DYNAMO_ENDPOINT='http://dynamo:8000'

WORKDIR /opt/backend

COPY . ./
RUN chmod +x ./run.sh

RUN apk update && apk add g++ cmake build-base && apk cache clean && rm -rf /var/cache/apk/*
RUN npm ci
RUN npm install aws-sdk --no-save --legacy-peer-deps
RUN npm run build

ENTRYPOINT ./run.sh
