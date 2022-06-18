FROM debian:bullseye-slim AS base
RUN apt update
RUN apt install -y npm \
                    nodejs 
RUN npm install -g typescript@latest react-scripts

FROM base AS build
# build client
COPY ./client /srv
WORKDIR /srv
RUN npm install
RUN npm run build

# build server
COPY ./server /usr/src/app
WORKDIR /usr/src/app
RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >> .env
RUN npm install
RUN npm run build

FROM build AS deploy
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
ARG MONGODB_PASSWORD=______
ENV MONGODB_PASSWORD=${MONGODB_PASSWORD}
ARG REDIS_HOST=localhost
ENV REDIS_HOST=${REDIS_HOST}
ARG REDIS_PORT=6379
ENV REDIS_PORT=${REDIS_PORT}

RUN echo ${MONGODB_PORT}

CMD ["npm", "start"]

FROM deploy as test
RUN npm install -g create-react-app
COPY ./test /test

# TODO: how to pass in environment to test command?
RUN /test/test.sh -s /usr/src/app -c /srv test

# TODO: test with mongodb & redis???

# TODO: pass environment variables for client and server in deployment (pipeline tests too)