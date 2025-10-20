#!/bin/bash

cd docker-mifel-mx-mascotas || exit 1
docker compose exec -u devuser app bash -c "clear; exec bash"
