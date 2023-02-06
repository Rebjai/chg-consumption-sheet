import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const users: User[] = [{
    id: 1,
    email: 'admin@mail.com',
    password: 'pass',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }]
  const usersRepositoryMock = {
    findOneBy: jest.fn().mockImplementation((options) => users[0])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
