# base image
FROM node:10.11.0

## set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

## install and cache app dependencies

RUN npm install -g webpack webpack-cli

## start app
#CMD ["npm", "test"]
CMD ["webpack"]
