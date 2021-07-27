FROM node:latest

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ -d "node_modules" ] && npm run start:dev || npm i && npm run start:dev
