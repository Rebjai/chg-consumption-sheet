import { PaginationDto } from './../common/dto/pagination.dto';
import { Area } from './entities/area.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class AreasService {

  constructor(@InjectRepository(Area) private areasRepository: Repository<Area>) { }

  create(createAreaDto: CreateAreaDto) {
    const newArea = new Area()
    newArea.name = createAreaDto.name
    return this.areasRepository.save(newArea);
  }

  findAll(pagination: PaginationDto = new PaginationDto()) {
    let result = paginate<Area>(this.areasRepository, pagination)
    return result;
  }

  findOne(id: number) {
    const found = this.areasRepository.findOne({ where: { id } })
    if (!found) {
      throw new NotFoundException()
    }
    return found;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return this.areasRepository.softDelete({ id })
  }
}
