import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { GetAllAreasQuery } from '../../queries/get-all-areas.query';
import { Area } from 'src/areas/domain/entities/area.entity';

@QueryHandler(GetAllAreasQuery)
export class GetAllAreasHandler implements IQueryHandler<GetAllAreasQuery> {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) {}

  async execute(query: GetAllAreasQuery) {
    return paginate<Area>(this.areasRepository, query.pagination);
  }
}
