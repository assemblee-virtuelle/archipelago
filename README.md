# Archipelago

[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

> Fostering interconnections between communities by creating synergies between their platforms

![archipelago](https://user-images.githubusercontent.com/17931931/196366532-f67d8ce3-749b-4791-ba31-493415983d3b.png)

A collaborative, interoperable and modular knowledge management system, compliant with most semantic web specifications: LDP, SPARQL, ActivityPub, WAC, WebID.

Based on linked data & semantic web technologies, it allows the co-production of knowledge graphs.
Built on open standards, it enables the development of interoperable information systems.
Designed on a modular architecture, it gives everyone the opportunity to build and customize platforms on demand.
Thanks to the micro-service architecture of [SemApps](https://github.com/assemblee-virtuelle/semapps), it is easy to extend it with your own business logic.


## Getting started

### Triple store

Launch the [Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) triplestore on port 3030:

```bash
docker-compose up -d fuseki
```

### Middleware

Add a `.env.local` file in the `/middleware` directory and fill the required OIDC configurations:

```dotenv
SEMAPPS_OIDC_ISSUER=
SEMAPPS_OIDC_CLIENT_ID=
SEMAPPS_OIDC_CLIENT_SECRET=
```

Launch the middleware on port 3000:

```bash
cd middleware
yarn install
yarn run dev
```

> This will launch Moleculer in [REPL mode](https://moleculer.services/docs/0.14/moleculer-repl.html), allowing you to call actions directly.

### Frontend

Launch the frontend on port 4000:

```bash
cd frontend
yarn install
yarn dev
```

## Archipelago customization

If you need to customize your Archipelago, you can follow the docs below:

- [Configuration file](./docs/configuration.md)
- [Layout configuration](./docs/layouts.md)

## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published on NPM, see the following instructions.

### Linking backend packages

To link backend packages, you can use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /ARCHIPELAGO_REPO
yarn run link-semapps-packages
```

### Linking frontend packages

Linking frontend packages with `yarn link` doesn't work because it causes version mismatch errors for React and MUI (see [this PR](https://github.com/assemblee-virtuelle/semapps/pull/1180) for explainations). So you should use [Yalc](https://github.com/wclr/yalc) instead. Fortunately, we make it easy for you.

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run yalc:publish
cd /ARCHIPELAGO_REPO/frontend
yarn run link-semapps-packages
```

Additionally, frontend packages need to be rebuilt on every changes, or they will not be taken into account by Archipelago. You can use `yarn run build` to build a package once, or `yarn run watch` to rebuild a package on every change. On every build, the new package will be published to Yalc.

Thanks to git hooks, the frontend packages will also be published to Yalc whenever git branches are changed.

## Run database migrations

You can use `dbMigrate` script to create database migrations and/or runs them.
Migrations files are created by default in `middleware/migrations` folder.

```bash
cd middleware
yarn run dbMigrate

# To create a new migration file
yarn run dbMigrate create --name archipelago-changeResourceAttribute

# To list all migrations
yarn run dbMigrate status

# To apply next not applied migration
yarn run dbMigration up

# To apply a given migration
yarn run dbMigration up --name archipelago-changeResourceAttribute

# To apply all not applied migrations
yarn run dbMigration up --latest

# To rollback previous applied migration
yarn run dbMigration down

# To rollback a migration
yarn run dbMigration down --name archipelago-changeResourceAttribute

# To rollback all applied migrations
yarn run dbMigration down --earliest
```

You can also call dbMigration actions from REPL middleware with `call dbMigration.status` for example.

## Deploying to production

Follow the guide [here](deploy/README.md).
