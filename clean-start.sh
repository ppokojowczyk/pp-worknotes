#!/bin/bash
set -e
if [ ! -f ./.env ]; then
    cp .env.example .env
fi
sudo rm -rf app/node_modules
sudo rm -f database/worknotes.db
docker-compose stop
docker-compose rm --force
docker-compose up
