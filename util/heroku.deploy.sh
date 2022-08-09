#!/bin/bash

docker login

docker build -t registry.heroku.com/sthinds-io/web --target deploy .

heroku container:login
docker push registry.heroku.com/sthinds-io/web

heroku container:release web
