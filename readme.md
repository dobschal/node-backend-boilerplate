# Node Backend Boilerplate

This repository contains boilerplate code to cook your own backend app with NodeJS, TypeScript, Postgres SQL and Docker.

## 🚀 Get Started

You need to have [Docker](https://docs.docker.com/get-docker/) installed.

Then use Docker Compose to run the server.

```bash
docker compose up
```

This will run the server on the configured port and enable auto-restart on code changes 😎!

## 🏃‍♀️ Run w/o Docker

If you want to run the server without Docker, you need to have NodeJS and NPM installed.
Add all environment variables into a `.env` file. See the existing template file.
Have the database running: You can do this via docker compose:

```bash
docker compose up -d postgres-database
```

Then install all dependencies and run the server:

```bash
npm install
npm run dev
```

## 🔨 Build & Run w/ Docker

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

## ⚙️ Environment Variables

Create a file `.env` and put all env vars there. (Copy the `.env.template` file).
Inside the `docker-compose.yml` you can specify those env vars too.

## Debugging with IntelliJ

Add a new NodeJS configuration and target the `src/index.ts` file.
Add all environment variables from the `.env` file to the configuration.

## ☝️ Hints

If a permission error for the build folder inside the docker container occurs, try to remove the image and container
fully and build again.
