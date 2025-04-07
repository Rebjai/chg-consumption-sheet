import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetAreaByIdQuery } from '../../queries/get-area-by-id.query';
import { Area } from 'src/areas/domain/entities/area.entity';

@QueryHandler(GetAreaByIdQuery)
export class GetAreaByIdHandler implements IQueryHandler<GetAreaByIdQuery> {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) {}

  async execute(query: GetAreaByIdQuery): Promise<Area> {
    const area = await this.areasRepository.findOne({ where: { id: query.id } });
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    return area;
  }
}
