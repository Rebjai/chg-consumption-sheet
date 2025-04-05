import { ProductSatCategory } from './../../../product-sat-category/entities/product-sat-category.entity';
import { Product } from './../../../products/entities/product.entity';
import { Connection, DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { hash, hashSync } from 'bcrypt';
import UserRole from 'src/users/enums/user-role.enum';
import csv from "csvtojson/index";


export class ProductsSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        const jsonArray = await csv().fromFile('src/common/db/seed-data/product-list.csv');
        const products = await Promise.all(jsonArray.map(async (product) => {
            return {
                name: product.name,
                price: product.price,
                category_id: product.category_id != "" ? product.category_id : null
            };
        }));
        await connection.createQueryBuilder().insert().into(Product).values(products).execute();
    }
}
