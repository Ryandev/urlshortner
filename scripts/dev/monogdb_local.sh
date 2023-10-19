#!/usr/bin/env bash
set -euo pipefail #bash strict mode
IFS=$'\n\t'

CONTAINER_NAME='mongodb-dev'
CONTAINER_IMAGE_TAG='mongo:5.0.21'
DATABASE_NAME='test1'

#MacOS run Docker.app & wait for launch
[ -d '/Applications/Docker.app' ] && open '/Applications/Docker.app' && sleep 8

docker pull "$CONTAINER_IMAGE_TAG"



DOCKER_CONTAINERS=$(docker container ls -a)
CONTAINER_MATCHES=$(echo "$DOCKER_CONTAINERS" | grep "$CONTAINER_NAME")

if [ "$CONTAINER_MATCHES" ]; then
    INSTANCE_ID=$(docker ps -a -q --filter="name=$CONTAINER_NAME")
    echo "Closing previous instance $INSTANCE_ID"
    docker stop "$INSTANCE_ID"
    docker rm  "$INSTANCE_ID"
fi

docker run --name "$CONTAINER_NAME" \
    -p 27017:27017 \
    -d "$CONTAINER_IMAGE_TAG"

echo "Waiting for instance..."
sleep 5

MONGO_CMD='db.createCollection("'"$DATABASE_NAME"'")' 
echo "$MONGO_CMD"
docker exec -it "$CONTAINER_NAME" mongo --eval "$MONGO_CMD"

echo "$CONTAINER_IMAGE_TAG running as $CONTAINER_NAME running"
echo "Use connection string:  mongodb://localhost:27017/?ssl=false&retryWrites=true&w=majority"
echo "Use database: $DATABASE_NAME"
