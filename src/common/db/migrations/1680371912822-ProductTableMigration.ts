import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class ProductTableMigration1680371912822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product",
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
                },
                {
                    name: "updated_at",
                    type: "timestamp",
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
                },
                {
                    name: "price",
                    type: "numeric",
                },
                {
                    name: "category_id",
                    type: "integer",
                    isNullable: true,
                },
            ],
        }), true);

        await queryRunner.createForeignKey("product", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_sat_category",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("product");
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("category_id") !== -1);

        await queryRunner.dropForeignKey("product", foreignKey);
        await queryRunner.dropColumn("product", "category_id");
        await queryRunner.dropTable("product");
    }

}
