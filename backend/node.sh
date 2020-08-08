#!/bin/sh

docker run --rm\
     -v $(pwd)/app:/app\
     -p 8080:8080\
     --name myNode\
     -ti\
     node:14.7.0-alpine3.10 ash