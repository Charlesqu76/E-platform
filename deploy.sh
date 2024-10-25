#! /bin/bash

echo "***** start *****"

dockerOperate(){
    echo "docker build start"
    docker build -t platform-api .
    docker stop platform-api 
    docker rm platform-api
    docker run -d --name platform-api --env-file ../.api_env -v /home/uploads:/usr/src/app/uploads -p 3001:3001 platform-api
    docker image prune -af
}

dockerOperate

echo "***** end *****"
