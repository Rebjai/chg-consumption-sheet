import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ConsumptionSheetTableMigration1680371933301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "consumption_sheet",
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
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()"
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "patient_id",
                    type: "bigint",
                    unsigned: true,
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "room_id",
                    type: "bigint",
                    unsigned: true,
                    isNullable: false
                },
                {
                    name: "diagnosis",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "doctor",
                    type: "varchar",
                    length: "255",
                    isNullable: false
                },
                {
                    name: "discharge_date",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "admission_date",
                    type: "timestamp",
                    isNullable: false
                },
            ]
        }), true);

        await queryRunner.createForeignKey("consumption_sheet", new TableForeignKey({
            columnNames: ["patient_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "patient",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
            name: "FK_CONSUMPTION_SHEET_PATIENT_ID"
        }));

        await queryRunner.createForeignKey("consumption_sheet", new TableForeignKey({
            columnNames: ["room_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "room",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
            name: "FK_CONSUMPTION_SHEET_ROOM_ID"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("consumption_sheet", "FK_CONSUMPTION_SHEET_PATIENT_ID");
        await queryRunner.dropForeignKey("consumption_sheet", "FK_CONSUMPTION_SHEET_ROOM_ID");
        await queryRunner.dropTable("consumption_sheet");
    }

}
