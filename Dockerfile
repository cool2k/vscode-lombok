FROM node

RUN apt-get update
RUN apt-get install -y xvfb libxtst6 libnss3 libgtk-3-0 libnotify4 gnupg libxkbfile1 libsecret-1-0 libxss1 libasound2
 
COPY ./images /code/images
COPY ./server /code/server
COPY ./src /code/src
COPY ./LICENSE /code/LICENSE
COPY ./package.json /code/package.json
COPY ./package-lock.json /code/package-lock.json
COPY ./README.md /code/README.md
COPY ./tsconfig.json /code/tsconfig.json
COPY ./tslint.json /code/tslint.json

WORKDIR /code

RUN npm install

RUN mkdir /tmp/data

RUN xvfb-run --auto-servernum npm test

ARG PUBLISHER_TOKEN
ENV PUBLISHER_TOKEN ${PUBLISHER_TOKEN}

RUN npx ovsx publish -p $PUBLISHER_TOKEN