import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConnectionOptions } from "typeorm-seeding";

dotenvExpand.expand(dotenv.config());
const migrationsConfig: DataSourceOptions & ConnectionOptions = {
    type: process.env.DB_DRIVER as "postgres" | "mysql" | "mariadb",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/**/entities/*.entity.js'],
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ['dist/src/common/db/migrations/*Migration.js'],
    seeds: ['dist/src/common/db/seeders/*.js'],
    factories: ['src/common/db/factories/**/*{.ts,.js}']
}
export default migrationsConfig
export { migrationsConfig }
