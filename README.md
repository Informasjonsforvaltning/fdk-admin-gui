# FDK Admin GUI

## Description

An administration application for Fellesdatakatalog.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t fdk-admin-gui .`
- Run the container using the following comand:
  - `docker run -d -p 8137:8080 -e ENV -e OIDC_ISSUER -e FDK_HARVEST_ADMIN_HOST -e ORGANIZATION_CATALOG_URI fdk-admin-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `ENV` - Environment
  - `development`
  - `production`
- `OIDC_ISSUER` - OIDC issuer URI
- `FDK_BASE_URI` - FDK Base URI
- `FDK_HARVEST_ADMIN_HOST` - fdk-harvest-admin API hostname
- `FDK_REGISTRATION_BASE_URI` - Base URI of the FDK registration application
- `ORGANIZATION_CATALOG_URI` - organization-catalog API hostname
- `FDK_CMS_BASE_URI` - dk-cms hostname

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:

- Create a new branch from the master branch
- Implement and commit changes
- Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:

- Stage files to be committed
- Run `npm run commit` script

Do not use `--no-verify` flag when making commits.
