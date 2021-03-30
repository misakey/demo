# Demo Misakey

This repository contains the Misakey's product demonstrations.

## Folder architecture

* `src/client` contains the frontend react app
* `src/server` contains the backend express server

## Development

Create a `docker-compose.override.yml` file with content

```yaml
version: '2'

services:
  server:
    image: server:local-build
    build:
      context: "src/server"
      dockerfile: Dockerfile.dev
    ports:
      - 5000:5000
    volumes:
      - "./src/server:/app"
    environment:
      - ENV=development

  client:
    image: client:local-build
    build:
      context: "src/client"
      dockerfile: Dockerfile.dev
    ports:
      - 3000:3000
    volumes:
      - "./src/client:/app"
    environment:
      - ENV=development
```

Then `docker-compose up` and you'll have a development server running for backend and frontend