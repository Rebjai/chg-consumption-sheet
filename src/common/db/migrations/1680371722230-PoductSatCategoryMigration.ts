import { MigrationInterface, QueryRunner, Table, Index, TableIndex } from 'typeorm';

export class PoductSatCategoryMigration1680371722230 implements MigrationInterface {
    name = 'PoductSatCategoryMigration1680371722230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product_sat_category',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'code',
                        type: 'bigint'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createIndex(
            'product_sat_category',
            new TableIndex({
                name: 'IDX_1e6f6cf1071046caa42ba53b0a',
                columnNames: ['code']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('product_sat_category', 'IDX_1e6f6cf1071046caa42ba53b0a');
        await queryRunner.dropTable('product_sat_category');
    }
}
