#!bin.bash

#docker build -t react_app .

#docker run -v $(pwd)/app:/usr/src/app -v $(pwd)/../src/main/resources/dist:/usr/src/dist  -it  react_app /bin/bash
#docker run -v $(pwd)/app:/usr/src/app -v $(pwd)/../src/main/resources/dist:/usr/src/dist react_app
#docker run -v $(pwd)/app:/usr/src/app -v $(pwd)/../src/main/resources/blockchain:/usr/src/dist react_app sh -c 'npm install && webpack'


docker run -v $(pwd)/app:/usr/src/app -v $(pwd)/../src/main/resources/blockchain:/usr/src/dist  -it  react_app sh -c 'webpack'
