FROM debian:bullseye-slim as base
RUN apt- update
RUN apt- install -y npm \
                    nodejs 
RUN npm install -g typescript@latest react-scripts

FROM base as build
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

FROM build as deploy
# TODO: define environment variables here and pass them inPORT=8000
# NODE_ENV=prod
# MONGODB_HOST=127.0.0.1
# MONGODB_PORT=27017
# MONGODB_USERNAME=admin
# MONGODB_PASSWORD=______
# REDIS_HOST=localhost
# REDIS_PORT=6379

CMD ["npm", "start"]

FROM deploy as test
RUN npm install -g jest ts-jest babel-jest@26.6.0
COPY ./test /test
# TODO: how to pass in environment to test command?
RUN /test/test.sh -s /usr/src/app -c /srv test

# TODO: test with mongodb & redis???

RUN ls /test
RUN ls /srv
RUN ls /usr/src/app

# TODO: pass environment variables for client and server in deployment (pipeline tests too)