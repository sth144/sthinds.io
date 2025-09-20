# ---------------------------
# Base image with Node.js and build tools
# ---------------------------
FROM node:20-bullseye-slim AS base

# Install global packages
RUN npm install -g typescript@latest react-scripts create-react-app --legacy-peer-deps

# ---------------------------
# Build library
# ---------------------------
FROM base AS build

COPY ./lib /usr/src/lib
WORKDIR /usr/src/lib

RUN npm install
RUN npx tsc -p .

# ---------------------------
# Build client
# ---------------------------
FROM build AS build_client

COPY ./client /usr/src/client
WORKDIR /usr/src/client

RUN npm install
RUN npm run build
RUN cp -r build /srv/

# ---------------------------
# Build server
# ---------------------------
FROM build AS build_server

COPY ./server /usr/src/app
WORKDIR /usr/src/app

# Pass client bundle path to server env
RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >>.env

RUN npm install
RUN npm run build

# ---------------------------
# Deployment stage
# ---------------------------
FROM build AS deploy

WORKDIR /usr/src/app

# Copy client and server builds
COPY --from=build_client /srv /srv
COPY --from=build_server /usr/src/app /usr/src/app

# Environment variables
ENV PORT=8000
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

ARG MONGODB_HOST=127.0.0.1
ENV MONGODB_HOST=${MONGODB_HOST}
ARG MONGODB_PORT=27017
ENV MONGODB_PORT=${MONGODB_PORT}
ARG MONGODB_USERNAME=admin
ENV MONGODB_USERNAME=${MONGODB_USERNAME}
ARG MONGODB_PASSWORD=password
ENV MONGODB_PASSWORD=${MONGODB_PASSWORD}

ARG REDIS_HOST=localhost
ENV REDIS_HOST=${REDIS_HOST}
ARG REDIS_PORT=6379
ENV REDIS_PORT=${REDIS_PORT}
ARG REDIS_URL=""
ENV REDIS_URL=${REDIS_URL}
ARG REDIS_USERNAME=""
ENV REDIS_USERNAME=${REDIS_USERNAME}
ARG REDIS_PASSWORD=""
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

CMD ["npm", "start"]

# ---------------------------
# Test stage
# ---------------------------
FROM deploy AS test

COPY ./test /test

CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]
