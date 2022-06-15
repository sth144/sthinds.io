FROM debian:bullseye-slim as base
RUN apt-get update
RUN apt-get install -y npm \
                    nodejs 
RUN npm install -g typescript@latest react-scripts

FROM base as build
# build client
COPY ./client /srv
WORKDIR /srv
RUN npm run build

# build server
COPY ./server /usr/src/app
WORKDIR /usr/src/app
RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >> .env
RUN npm run build

FROM build as test
RUN npm install -g jest ts-jest babel-jest@26.6.0
COPY ./test /test
RUN /test/test.sh -s /usr/src/app -c /srv test

# TODO: test with mongodb & redis???

RUN ls /test
RUN ls /srv
RUN ls /usr/src/app

# TODO: mount .env file for client and server in deployment (pipeline tests too)