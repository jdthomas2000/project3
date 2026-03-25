FROM node:20-bookworm-slim

RUN mkdir -p /src/App

WORKDIR /src/App/ui/frontend

COPY . /src/App

RUN yarn install

EXPOSE 5173

CMD [ "npm", "start" ]