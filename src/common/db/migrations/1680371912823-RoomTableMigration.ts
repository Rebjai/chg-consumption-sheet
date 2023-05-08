import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RoomTableMigration1680371912823 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "room",
            columns: [
                {
                    name: "id",
                    type: "serial",
                    isPrimary: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false,
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false,
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "status",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "type",
                    type: "integer",
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("room");
    }
}
