import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;
  const roomsRepositoryMock = {}


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: roomsRepositoryMock
        }],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
