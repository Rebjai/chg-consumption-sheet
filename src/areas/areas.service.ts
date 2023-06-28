import { Area } from './entities/area.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {

  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>)
  {}

  create(createAreaDto: CreateAreaDto) {
    const newArea = new Area()
    newArea.name =  createAreaDto.name
    return this.areaRepository.save(newArea);
  }

  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    const found = this.areaRepository.findOne({where: {id}})
    if (!found) {
      throw new NotFoundException()
    }
    return found;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return this.areaRepository.softDelete({id})
  }
}
