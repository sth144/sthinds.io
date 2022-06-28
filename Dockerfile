# TODO: push base to Docker hub to speed up build
FROM debian:bullseye-slim AS base
RUN apt update
RUN apt install -y npm \
                    nodejs 
RUN npm install -g typescript@latest react-scripts create-react-app

FROM base AS build
COPY ./lib /usr/src/lib
WORKDIR /usr/src/lib
RUN npm install
RUN tsc -p .

# build client
COPY ./client /usr/src/client
WORKDIR /usr/src/client
RUN npm install
RUN npm run build
RUN cp -r build /srv/

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
ARG MONGODB_PASSWORD=password
ENV MONGODB_PASSWORD=${MONGODB_PASSWORD}
ARG REDIS_HOST=localhost
ENV REDIS_HOST=${REDIS_HOST}
ARG REDIS_PORT=6379
ENV REDIS_PORT=${REDIS_PORT}

CMD ["npm", "start"]

FROM deploy as test
COPY ./test /test

CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]

# TODO: pass environment variables for client and server in deployment (pipeline tests too)