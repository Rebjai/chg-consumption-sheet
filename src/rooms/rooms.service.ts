import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { validate } from 'class-validator';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) { }

  async create(createRoomDto: CreateRoomDto) {
    const errors = await validate(createRoomDto);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Invalid data', errors }, HttpStatus.BAD_REQUEST);
    }
    const room = new Room();
    room.name = createRoomDto.name;
    room.status = createRoomDto.status;
    return await this.roomsRepository.save(room);
  }

  async findAll() {
    return await this.roomsRepository.find();
  }

  async findOne(id: number) {
    return await this.roomsRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
    const errors = await validate(updateRoomDto);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Invalid data', errors }, HttpStatus.BAD_REQUEST);
    }
    room.name = updateRoomDto.name;
    room.status = updateRoomDto.status;
    return await this.roomsRepository.save(room);
  }


  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
