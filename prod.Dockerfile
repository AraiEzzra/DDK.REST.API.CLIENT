FROM    node:10-alpine

RUN     apk add --no-cache python automake autoconf libtool git alpine-sdk

WORKDIR /home/ddk-rest-api

COPY    ./package.json /home/ddk-rest-api/
COPY    ./package-lock.json /home/ddk-rest-api/

RUN     npm install

COPY    ./dist/ /home/ddk-rest-api/dist/
