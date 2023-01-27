import { DataSource, DataSourceOptions } from 'typeorm';
import ormConfig from '../../../ormconfig'

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource(
                ormConfig as DataSourceOptions
            );

            return dataSource.initialize();
        },
    },
];