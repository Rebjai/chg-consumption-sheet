import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import UserRole from './enums/user-role.enum';
import { StaffService } from 'src/staff/staff.service';
import BcryptHashService from 'src/auth/bcrypt-hash.service';

describe('UsersController', () => {
  let controller: UsersController;
  const users: User[] = [{
    id: 1,
    email: 'admin@mail.com',
    password: 'pass',
    role: UserRole.ADMIN,
    created_at: new Date(),
    updated_at: new Date()
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
        },
        {
          provide: StaffService,
          useValue: {}
        },
        {
          provide: BcryptHashService,
          useValue: {
            hash: jest.fn().mockImplementation((x: string) => x),
            compare: jest.fn().mockImplementation((x: string, y: string) => x === y),
          }
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
