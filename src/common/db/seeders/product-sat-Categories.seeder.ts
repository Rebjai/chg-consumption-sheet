import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import csv from "csvtojson/index";
import { ProductSatCategory } from "src/inventory/product-sat-category/entities/product-sat-category.entity";


export class ProductSatCategorySeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        const jsonArray = await csv().fromFile('src/common/db/seed-data/sat_codes.csv');
        const products = jsonArray.map((product : ProductSatCategory) => {
            return {
                name: product.name,
                code: product.code,
            };
        });
        await connection.createQueryBuilder().insert().into(ProductSatCategory).values(products).execute();
    }
}