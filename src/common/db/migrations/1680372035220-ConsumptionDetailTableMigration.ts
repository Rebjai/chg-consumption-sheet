import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ConsumptionDetailTableMigration1680372035220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "consumption_detail",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
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
            name: "consumption_sheet_id",
            type: "bigint",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "product_id",
            type: "bigint",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "staff_id",
            type: "bigint",
            unsigned: true,
            isNullable: false,
          },
          {
            name: "quantity",
            type: "integer",
            isNullable: false,
          },
          {
            name: "total",
            type: "integer",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "consumption_detail",
      new TableForeignKey({
        columnNames: ["consumption_sheet_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "consumption_sheet",
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      })
    );

    await queryRunner.createForeignKey(
      "consumption_detail",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      })
    );

    await queryRunner.createForeignKey(
      "consumption_detail",
      new TableForeignKey({
        columnNames: ["staff_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "staff",
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("consumption_detail", "FK_c6769cc6c8f0fa486979d64d2f1");
    await queryRunner.dropForeignKey("consumption_detail", "FK_baeea2c4c8215d93bd25467921a");
    await queryRunner.dropForeignKey("consumption_detail", "FK_0fc93b6c16d66d8cac7580e6c61");
    await queryRunner.dropTable("consumption_detail");
  }
}
