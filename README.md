# test-marketplace

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=TEST-Marketplace&uri=https://github.com/raulrr88/test-marketplace/blob/master/Insomnia_test_marketplace.json?token=AB6AVBVOVTL2RH5TCT6QA5DAJ3FLS)

Click on Insomnia button to import all requests and tests to run in your machine.

## How to run ( Local and Remote):

----
### LOCAL:
----
#### Install Docker:
- https://www.docker.com/products/docker-desktop
----
#### Install and Run Postgres DB on Docker:
```
docker run --name test-marketplace -e POSTGRES_PASSWORD=[PASSWORD] -p 5432:5432 -d postgres
```
#### List containers/apps running:
```
docker ps
```
#### Start DB on Docker ( if not running ):
```
docker start test-marketplace
```
----
#### Install DBeaver to manage DB:
- https://dbeaver.io/download/
- Create a DB called `test-marketplace`
----
#### Running project:
- Install dependencies with `yarn`
- Run all migrations with `yarn typeorm migration:run`
- Start the project with `yarn dev:server` for development
or
- Build with `yarn build`
- Start the project with `yarn start` for production
- `yarn lint` to check code lint

----
### PS: Don't forget to create `.env` file in the root folder and to paste all environment variables.
Template
```
PORT=4000
NODE_ENV=development
DATABASE_URL=
```
----
### LOCAL:
Access application running on Heroku:
- https://app-test-marketplace.herokuapp.com
- You can also test with Insomnia, changing the Insomnia's environment to production.
