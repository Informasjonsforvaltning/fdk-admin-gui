# FDK Admin GUI

A web application for managing harvesting datasources, allowing users to add, edit, delete, and trigger harvesting.

For a broader understanding of the system’s context, refer to the [architecture documentation](https://github.com/Informasjonsforvaltning/architecture-documentation) wiki. For more specific
context on this application, see the [Harvesting](https://github.com/Informasjonsforvaltning/architecture-documentation/wiki/Architecture-documentation#harvesting) subsystem section.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >=18.16
- [npm](https://www.npmjs.com/get-npm) >=10.2.3
- [Docker](https://www.docker.com/get-started)
- [docker-compose](https://docs.docker.com/compose/install/)

### Running locally (development)

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/fdk-admin-gui.git
cd fdk-admin-gui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

Go to http://localhost:8080

### Run locally using docker compose
```bash
docker compose up -d --build
```

Go to http://localhost:8137
