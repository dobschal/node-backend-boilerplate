
# This is the dockerfile for the production environment
# It builds the application and runs it

FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["node", "build/index.js"]