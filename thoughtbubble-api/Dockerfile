FROM node:14.15.1-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --only=prod

EXPOSE 3001

RUN echo 'thoughtbubble service running'

CMD ["npm", "start"]