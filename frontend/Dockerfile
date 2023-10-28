FROM node:18-alpine AS base

# Build the frontend.
FROM base AS frontend

ENV BACKEND_URL=''

WORKDIR /opt/frontend
COPY ./package*.json ./
RUN npm ci
COPY . ./

ENTRYPOINT ["npm", "run"]
CMD ["start"]
