import { EntityRepository, Repository } from 'typeorm';
import { CHGBaseEntity } from '../entities/chgBaseEntity.entity';
export class CHGBaseRepository extends Repository<CHGBaseEntity> {
  // async findByNumber(number: string): Promise<Room> {
  //   return await this.findOne({ number });
  // }

  // async findByType(type: string): Promise<Room[]> {
  //   return await this.find({ where: { type } });
  // }
}
