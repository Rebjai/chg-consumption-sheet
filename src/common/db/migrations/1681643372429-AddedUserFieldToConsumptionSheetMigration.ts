import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddedUserFieldToConsumptionSheetMigration1681643372429 implements MigrationInterface {
    name = 'AddedUserFieldToConsumptionSheetMigration1681643372429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("consumption_sheet", new TableColumn({
            name: "total",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("consumption_sheet", "total");
    }

}
