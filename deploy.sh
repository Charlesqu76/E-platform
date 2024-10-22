#! /bin/bash

echo "***** start *****"

dockerOperate(){
    echo "docker build start"
    docker build -t platform .
    docker stop platform 
    docker rm platform
    docker run -d --name platform -p 3000:3000 platform
    docker image prune -af
}

dockerOperate

echo "***** end *****"
