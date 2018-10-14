#!bin.bash

docker build -t react_app .

#docker run -v $(pwd)/app:/usr/src/app  -it  react_app /bin/bash
docker run -v $(pwd)/app:/usr/src/app react_app
