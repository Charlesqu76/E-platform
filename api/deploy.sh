#! /bin/bash

echo "***** start *****"

dockerOperate(){
    echo "docker build start"
<<<<<<< HEAD
    docker build -t platform .
    docker stop platform 
    docker rm platform
    docker run -d --name platform -p 3000:3000 platform
=======
    docker build -t platform-api .
    docker stop platform-api 
    docker rm platform-api
    docker run -d --name platform-api --env-file ../.env -v /home/ubuntu/uploads:/uploads -p 3001:3001 platform-api
>>>>>>> api/master
    docker image prune -af
}

dockerOperate

echo "***** end *****"
