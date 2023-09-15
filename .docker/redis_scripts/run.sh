#!/bin/bash
APP_ENV=${APP_ENV}

configFile=/etc/redis.conf

if [[ -r $configFile ]]; then
    . "$configFile"
    echo "name: $name" # Print the 'name' environment variable
    echo "pass: $pass" # Print the 'pass' environment variable
else
    echo "configFile not found or not readable."
    exit 1
fi