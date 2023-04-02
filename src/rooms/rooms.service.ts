import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from './../common/dto/pagination.dto';
import { QueryRoomDto } from './dto/query-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { validate } from 'class-validator';
import { RoomStatus } from './enums/room-status.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) { }

  async create(createRoomDto: CreateRoomDto) {
    
    const errors = await validate(plainToInstance(CreateRoomDto, createRoomDto));
    if (errors.length > 0) {
      throw new HttpException({ message: 'Invalid data', errors }, HttpStatus.BAD_REQUEST);
    }
    if (createRoomDto.name == '') {

    }
    const room = new Room();
    room.name = createRoomDto.name;
    room.status = createRoomDto.status;
    room.type = createRoomDto.type;
    return await this.roomsRepository.save(room);
  }

  async findAll(query: QueryRoomDto, pagination: PaginationDto = new PaginationDto()) : Promise<Pagination<Room>>{
    // const rooms: Room[] = await this.roomsRepository.find()
    console.log({query, pagination});
    
    return paginate<Room>(this.roomsRepository, pagination, query);
  }

  async findOne(id: number) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) {
      throw new NotFoundException("Room not found");

    }
    return room
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const errors = await validate(plainToInstance(UpdateRoomDto, updateRoomDto));
    if (errors.length > 0) {
      throw new BadRequestException({ message: 'Invalid data', errors });
    }
    room.name = updateRoomDto.name;
    room.status = updateRoomDto.status;
    room.type = updateRoomDto.type;
    return await this.roomsRepository.save(room);
  }


  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  async updateRoomStatus(id: number, status: RoomStatus) {
    const room = await this.roomsRepository.findOneBy({ id })
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    if (room.status == status) {
      throw new BadRequestException("The room has that status already");
      
    }
    room.status = status
    return await this.roomsRepository.save(room)
  }
}
