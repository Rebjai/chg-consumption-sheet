import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddedUserFieldToConsumptionDetailMigration1681612576151 implements MigrationInterface {
    name = 'AddedUserFieldToConsumptionDetailMigration1681612576151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("consumption_detail", new TableColumn({
            name: "user_id",
            type: "bigint",
            unsigned: true,
            isNullable: false
        }));

        await queryRunner.dropForeignKey("consumption_detail", "FK_c6769cc6c8f0fa486979d64d2f1");

        await queryRunner.changeColumn("consumption_detail", "staff_id", new TableColumn({
            name: "staff_id",
            type: "bigint",
            unsigned: true,
            isNullable: true
        }));

        await queryRunner.createForeignKey("consumption_detail", new TableForeignKey({
            name: "FK_c6769cc6c8f0fa486979d64d2f1",
            columnNames: ["staff_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "staff",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }));

        await queryRunner.createForeignKey("consumption_detail", new TableForeignKey({
            name: "FK_4f79974192afdc1fb9c10e41233",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("consumption_detail", "FK_4f79974192afdc1fb9c10e41233");
        await queryRunner.dropForeignKey("consumption_detail", "FK_c6769cc6c8f0fa486979d64d2f1");
        await queryRunner.changeColumn("consumption_detail", "staff_id", new TableColumn({
            name: "staff_id",
            type: "bigint",
            unsigned:true,
            isNullable: false
        }));
        await queryRunner.createForeignKey("consumption_detail", new TableForeignKey({
            name: "FK_c6769cc6c8f0fa486979d64d2f1",
            columnNames: ["staff_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "staff",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }));
        await queryRunner.dropColumn("consumption_detail", "user_id");
    }
}
