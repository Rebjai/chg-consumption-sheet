import { Product } from './../../../products/entities/product.entity';
import { Connection, DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { hash, hashSync } from 'bcrypt';
import UserRole from 'src/users/enums/user-role.enum';
import * as  csv from "csvtojson";

export class ProductsSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        const jsonArray = await csv().fromFile('src/common/db/seed-data/products.csv');
        const products = jsonArray.map((product) => {
            return {
                name: product.name,
                price: product.price,
            };
        });
        await connection.createQueryBuilder().insert().into(Product).values(products).execute();
    }
}