import { PaginationDto } from './../common/dto/pagination.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { RoomStatus } from './enums/room-status.enum';
import { RoomType } from './enums/room-type.enum';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';


describe('RoomsService', () => {
  let service: RoomsService;
  const rooms: Room[] = [
    {
      id: 1,
      name: '204',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
  const roomsRepositoryMock = {
    save: jest.fn().mockImplementation((room: Room) => room),
    findOneBy: jest.fn().mockImplementation(({ id }) => rooms.find(val => val.id == id) as Room),
    find: jest.fn().mockImplementation((options) => rooms)
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
  it('should NOT CREATE a room entity', async () => {
    const newRoomData: CreateRoomDto = {
      name: '',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
    }
    try {
      const created = await service.create(newRoomData)

    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(roomsRepositoryMock.save).not.toHaveBeenCalledTimes(2)

    }
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
  it('should NOT UPDATE a room entity', async () => {
    const newRoomData: CreateRoomDto = {
      name: '',
      status: RoomStatus.AVAILABLE,
      type: RoomType.CLASSIC,
    }
    try {
      const found = await service.update(1, newRoomData)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.status).toBe(400)
    }
    finally {
      expect(roomsRepositoryMock.save).not.toHaveBeenCalledTimes(3)
    }
    try {
      const found = await service.update(10, newRoomData)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.status).toBe(404)
    }
    finally {
      expect(roomsRepositoryMock.save).not.toHaveBeenCalledTimes(3)
    }
  })

  it('should FIND ALL rooms', async () => {
    const found = await service.findAll({})
    expect(roomsRepositoryMock.find).toHaveBeenCalledWith({ where: {}, skip: 0, take: 10 })
  })
  it('should FIND ALL rooms, pagination', async () => {
    const pagination = new PaginationDto()
    pagination.skip = 10
    const found = await service.findAll({}, pagination)
    expect(roomsRepositoryMock.find).toHaveBeenCalledWith({ where: {}, skip: 10, take: 10 })
  })
  it('should FIND ONE room by id', async () => {
    const found = await service.findOne(1)
    expect(roomsRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 })
  })
  it('should FAIL to FIND ONE room by id', async () => {
    try {
      const found = await service.findOne(10)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
  })
  it('should UPDATE STATUS of room', async () => {
    const updatedStatus = RoomStatus.OCCUPIED
    const found = await service.updateRoomStatus(1, updatedStatus)
    expect(found.status).toBe(updatedStatus)
  })
  it('should NOT UPDATE STATUS of room', async () => {
    const updatedStatus = RoomStatus.OCCUPIED
    try {
      const found = await service.updateRoomStatus(1, updatedStatus)
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.status).toBe(400)
    } finally {
      expect(roomsRepositoryMock.save).not.toHaveBeenCalledTimes(4)
    }
    try {
      const found = await service.updateRoomStatus(10, updatedStatus)

    } catch (error) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.status).toBe(404)
    } finally {
      expect(roomsRepositoryMock.save).not.toHaveBeenCalledTimes(4)
    }
  })
});
