#!/bin/bash

docker build -t sthinds.io:base . --target base 
docker build -t sthinds.io:build . --target build 
docker build -t sthinds.io:build_client . --target build_client 
docker build -t sthinds.io:build_server . --target build_server 
docker build -t registry.heroku.com/sthinds-io/web . --target deploy 