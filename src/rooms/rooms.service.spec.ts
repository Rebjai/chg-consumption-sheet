import { CreateRoomDto } from './dto/create-room.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { RoomStatus } from './enums/room-status.enum';
import { RoomType } from './enums/room-type.enum';
import { BadRequestException } from '@nestjs/common';


describe('RoomsService', () => {
  let service: RoomsService;
  const rooms: Room[] = [
    {
      id:1,
      name: '204',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
  const roomsRepositoryMock = {
    save: jest.fn().mockImplementation((room: Room)=>room),
    findOneBy: jest.fn().mockImplementation(({id})=> rooms.find(val => val.id == id) as Room)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: roomsRepositoryMock
        }
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should CREATE a room entity', async () => {
    const newRoomData: CreateRoomDto = {
      name: '204',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
    }
    const created = await service.create(newRoomData)
    expect(created).toBeInstanceOf(Room)
    expect(roomsRepositoryMock.save).toHaveBeenCalled()
  })
  it('should UPDATE a room entity', async () => {
    const newRoomData: CreateRoomDto = {
      name: '204',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
    }
    const found = await service.update(1, newRoomData)
    expect(roomsRepositoryMock.findOneBy).toHaveBeenCalled()
    expect(roomsRepositoryMock.save).toHaveBeenCalledTimes(2)
  })
  
});
