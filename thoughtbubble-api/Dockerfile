FROM node:14.15.1-alpine

RUN mkdir -p /api

WORKDIR /api

COPY package*.json /api
RUN npm install --only=prod --silent

COPY . /api

EXPOSE 3001

RUN echo 'thoughtbubble API running'

CMD ["npm", "server"]