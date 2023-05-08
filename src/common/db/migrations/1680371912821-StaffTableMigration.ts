import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class StaffTableMigration1680371912821 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "staff",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()",
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
                        name: "first_surname",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "second_surname",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "date_of_birth",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "bigint",
                        unsigned:true,
                        isNullable: true,
                    },
                    {
                        name: "telephone_number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "job_title",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "staff",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION",
                name: "FK_staff_user_id",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("staff", "FK_staff_user_id");
        await queryRunner.dropTable("staff");
    }
}
