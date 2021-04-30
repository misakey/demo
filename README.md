# Demo Misakey

This repository contains the Misakey's product demonstrations.

## Folder architecture

* `src/client` contains the frontend react app
* `src/server` contains the backend express server

## Development

The dev env doesn't not work with Docker. So you should run manually the two dev servers

### Server

Go on `src/server`

Copy the `.env.sample` to `.env` and complete it (with org id / secret of the producer app that you can generate on app.misakey.)

Then run `yarn install` and `yarn start`. It should run dev server on port 5000


### Client

Go on `src/client`

Copy the `.env.sample` to `.env` (no modifications are required for now)

Then run `yarn install` and `yarn start`. It should run dev server on port 3000 + open your brower

## Production

Copy the `.env.server.sample` to `.env.server` and complete it (with org id / secret of the producer app that you can generate on app.misakey.)
 
Copy the `.env.client.sample` to `.env.client` and complete it (with org id / secret from app.misakey) 

Then `docker-compose up` and you'll have a production server running for server and client.