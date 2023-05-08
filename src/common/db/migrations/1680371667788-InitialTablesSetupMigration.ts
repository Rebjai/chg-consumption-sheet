import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTablesSetupMigration1680371667788 implements MigrationInterface {
    name = 'InitialTablesSetupMigration1680371667788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isPostgres = queryRunner.connection.driver.options.type === 'postgres';
        const isMySql = queryRunner.connection.driver.options.type === 'mysql' || queryRunner.connection.driver.options.type === 'mariadb';

        if (isPostgres) {
            await queryRunner.query(`CREATE TYPE user_role_enum AS ENUM('1', '2', '10')`);
        } else if (isMySql) {
            await queryRunner.query(`CREATE TABLE user_role_enum (id INT PRIMARY KEY, name ENUM('1', '2', '10'))`);
        }


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isPostgres = queryRunner.connection.driver.options.type === 'postgres';
        const isMySql = queryRunner.connection.driver.options.type === 'mysql' || queryRunner.connection.driver.options.type === 'mariadb';

        if (isPostgres) {
            await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        } else if (isMySql) {
            await queryRunner.query(`DROP TABLE user_role_enum`);
        }
    }

}
