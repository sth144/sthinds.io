#!/bin/bash

docker build -t registry.heroku.com/sthinds-io/web --target deploy .
docker push registry.heroku.com/sthinds-io/web

heroku container:release web
