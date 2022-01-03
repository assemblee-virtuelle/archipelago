# Archipelago

[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

> Fostering interconnections between communities by creating synergies between their platforms

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
yarn start
```


## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published, we recommend to use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

### Linking middleware packages

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /ARCHIPELAGO_REPO/middleware
yarn run link-semapps-packages
```

### Linking frontend packages

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run link-all
cd /ARCHIPELAGO_REPO/frontend
yarn run link-semapps-packages
```

Additionally, frontend packages need to be rebuilt, or your changes will not be taken into account by Archipelago. 
You can use `yarn run build` to build a package once, or `yarn run dev` to rebuild a package on every change.


## Deploying to production

Follow the guide [here](deploy/README.md).
