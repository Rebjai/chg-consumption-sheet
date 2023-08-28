# CHG Comsumption Sheet

This project serves as the backend for [CHG_APP](https://github.com/Rebjai/chg-app), designed to monitor the consumption of hospital patients. It supports multiple users, roles, and permissions to ensure security and data integrity are maintained.

The technology stack has been intentionally kept minimal to reduce complexity and potential points of failure.

Made with:
- [Nestjs](https://nestjs.com/)
- [typeORM](https://typeorm.io/)

## Requirements
- node 16.14
- postgres


## First steps

make a .env file (check .env.production and env.development for an example)

```bash
cp .env.development .env
```
install all dependencies
```bash
npm run install
```

if it is the first time running it you should migrate the database schema and seed the database
```bash 
npm run migrate
npm run seed:run #(make file src/common/db/seed-data/product-list.csv)
```


## Using Docker for development
We provide a docker-compose file to make development easier.

```bash
docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Jesús Rebollar](https://jesusrebollar.com)
- Website - [CHG](https://clinicahospitalguadalupe.com/)

## License
chg-consumption-sheet is licensed under [Apache 2](LICENSE)