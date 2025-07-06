import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import migrationsConfig from './seeders-migrations.config';



const dataSource = new DataSource(migrationsConfig)
export default dataSource
