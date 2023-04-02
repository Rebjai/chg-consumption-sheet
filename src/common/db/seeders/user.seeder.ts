import { User } from './../../../users/entities/user.entity';
import { Connection, DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { hash, hashSync } from 'bcrypt';
import UserRole from 'src/users/enums/user-role.enum';

export class UserSeeder implements Seeder {
    public async run(factory: Factory, connection: DataSource): Promise<void> {
        console.log(connection);
        await connection.createQueryBuilder().insert().into(User).values(
            [
                { 
                    email: 'admin@mail.com', 
                    password: hashSync('pass1234', 8),
                    role: UserRole.ADMIN
                }
            ]
        ).execute()

    }
}