FROM node:14-alpine

EXPOSE 3000

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm -g

RUN mkdir -p /usr/src/react_server
WORKDIR /usr/src/react_server

COPY package*.json ./
RUN npm install && npm update --force
ENV PATH /usr/src/react_server/node_modules/.bin:$PATH

RUN mkdir -p /usr/src/react_server/app
WORKDIR /usr/src/react_server/app
COPY . .

