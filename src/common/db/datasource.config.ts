import { DataSource } from 'typeorm';
import migrationsConfig from './seeders-migrations.config';



const dataSource = new DataSource(migrationsConfig)
export default dataSource
