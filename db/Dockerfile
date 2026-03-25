FROM node:20-bookworm-slim

RUN mkdir -p /src/App

WORKDIR /src/App

COPY . /src/App

RUN yarn install

EXPOSE 3000

CMD [ "npm", "start" ]