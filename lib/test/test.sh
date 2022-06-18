#!/bin/bash

# TODO: migrate to jest
# TODO: run tests from pipeline

nyc --extension=.ts --include src --exclude **/*.spec.ts \
    mocha   --reporter mocha-multi-reporters \
            --reporter-options configFile=test/mocha-reports.config.json \
            --require ts-node/register \
            'src/**/*.spec.ts'
