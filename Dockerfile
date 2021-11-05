FROM node:14-alpine

EXPOSE 5000

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

RUN mkdir -p /usr/src/node_server
WORKDIR /usr/src/node_server

COPY package*.json ./
RUN npm install
ENV PATH /usr/src/node_server/node_modules/.bin:$PATH

RUN mkdir -p /usr/src/node_server/app
WORKDIR /usr/src/node_server/app
COPY . .


