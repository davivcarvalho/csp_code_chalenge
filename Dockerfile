FROM node:latest

WORKDIR /home/app

COPY package*.json /home/app

RUN npm install

COPY . /home/app

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

