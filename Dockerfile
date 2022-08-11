# TODO: push base to Docker hub to speed up build
FROM debian:bullseye-slim AS base
RUN apt update
RUN apt install -y npm \
                    nodejs 
RUN npm install -g typescript@latest react-scripts create-react-app

FROM sthinds.io:base AS build
COPY ./lib /usr/src/lib
WORKDIR /usr/src/lib
RUN npm install
RUN tsc -p .

FROM sthinds.io:build as build_client
# build client
COPY ./client /usr/src/client
WORKDIR /usr/src/client
RUN npm install
RUN npm run build
RUN cp -r build /srv/

FROM sthinds.io:build as build_server
# build server
COPY ./server /usr/src/app
WORKDIR /usr/src/app
RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >> .env
RUN npm install
RUN npm run build

FROM sthinds.io:build AS deploy
WORKDIR /usr/src/app
COPY --from=build_client /srv /srv
COPY --from=build_server /usr/src/app /usr/src/app
# TODO: define environment variables here and pass them in
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

FROM deploy as test
COPY ./test /test

CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]

# TODO: pass environment variables for client and server in deployment (pipeline tests too)