FROM    node:10-alpine

RUN     apk add --no-cache python automake autoconf libtool git alpine-sdk

WORKDIR /home/ddk-rest-api

COPY    ./package.json /home/ddk-rest-api/
COPY    ./package-lock.json /home/ddk-rest-api/

RUN     npm install

COPY    ./webpack.config.prod.js /home/ddk-rest-api/
COPY    ./tsconfig.json /home/ddk-rest-api/
COPY    ./tslint.json /home/ddk-rest-api/
COPY    ./src/ /home/ddk-rest-api/src/

RUN     npm run build
