# Node Backend Boilerplate

This repository contains boilerplate code to cook your own backend app with NodeJS, TypeScript, Postgres SQL and Docker.


## 🚀 Get Started

You need to have [Docker](https://docs.docker.com/get-docker/) installed.

Then use Docker Compose to run the server.
```bash
docker-compose up
```

This will run the server on the configured port and enable auto-restart on code changes 😎! 

## 🔨 Build & Run
Build the docker image with name `node-boilerplate` and tag `latest`:
```bash
docker build . -t node-server:latest
```

Run a Docker container with the previous built image and expose port 3000:
```bash
docker run -d -p 3000:3000 node-server:latest
```

## 🔍 Linting

To enable linting, you need to have NodeJS and NPM installed. 
Then install all dependencies and use the lint script as follows:
```bash
npm install
npm run lint
```

## ☝️ Hints

If a permission error for the build folder inside the docker container occurs, try to remove the image and container fully and build again.


## Features

- [ ] Authorisation with JWTs
- [ ] Integration tests against temp database
- [x] Eslint with auto formatting
- [ ] Postgres SQL database
- [x] ExpressJS with router
- [ ] Database Migrations
- [x] Use Docker all the way
- [x] Use TypeScript
- [ ] Support OpenAPI specs
- [ ] Use K8s (MiniKube) for Deployment
- [ ] [Allow debugging with breakpoins](https://www.jetbrains.com/help/idea/node-with-docker-compose.html)
