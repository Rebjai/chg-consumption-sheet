import { UpdateUserDto } from './dto/update-user.dto';
import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Unique } from 'typeorm';
import UserRole from './enums/user-role.enum';
import { StaffService } from 'src/staff/staff.service';
import BcryptHashService from 'src/auth/bcrypt-hash.service';
import { Staff } from 'src/staff/entities/staff.entity';
import { find } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  const TEST_EMAILS = {
    UNIQUE: 'unique@email.com',
    ADMIN: 'admin@mail.com',
    USER: 'mail@mail.com'
  }
  const initialUsers: User[] = [{
    id: 1,
    email: 'admin@mail.com',
    password: 'pass',
    role: UserRole.ADMIN,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    email: 'mail@mail.com',
    password: 'pass',
    role: UserRole.SUPERVISOR,
    created_at: new Date(),
    updated_at: new Date()
  }
  ]
  let users: User[] = [...initialUsers];
  const usersRepositoryMock = {
    save: jest.fn((user: User) => {
      if (users.find(e => e.email == user.email)) {
        throw new UnprocessableEntityException('Email already in use');
        }
        user.id = users.length + 1; // Simulate auto-increment ID
        users.push(user);
        return user;
        }),
    findOneBy: jest.fn().mockImplementation(({ email, id }) => email ? users.find(e => e.email == email) : id ? users.find(e => e.id == id) : null),
    find: jest.fn((...args) => users),
    findOne: jest.fn().mockImplementation(({ where }) => {
      if (where.id) {
        const user = users.find(e => e.id == where.id);
        return user ? { ...user, password: 'hashed' } : null;
      }
      if (where.email) {
        const user = users.find(e => e.email == where.email);
        return user ? { ...user, password: 'hashed' } : null;
      }
    }),
    count: jest.fn().mockResolvedValue(users.length),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock
        },
        {
          provide: BcryptHashService,
          useValue: {
            hash: jest.fn((password) => password),
            compare: jest.fn((password, hash) => password === hash),
          }
        },
        StaffService,
        {
          provide: getRepositoryToken(Staff),
          useValue: {
            findOne: jest.fn().mockImplementation(({ where }) => {
              return where.email ? { id: where.email, name: 'Test Staff' } : null;
            }
            ),
            find: jest.fn().mockResolvedValue([]),
          }
        }
      ],
    }).compile();

    users = [...initialUsers];
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE a new user', async () => {
    const newUserData: CreateUserDto = {
      email: TEST_EMAILS.UNIQUE,
      password: 'pass1234',
      password_confirmation: 'pass1234',
    }
    const newUser = await service.create(newUserData)
    expect(usersRepositoryMock.save).toHaveBeenCalled()
    expect(newUser.password).toBe(newUserData.password)

  })

  it('should NOT CREATE a new user', async () => {
    const newUserData: CreateUserDto = {
      email: TEST_EMAILS.USER,
      password: 'pass1234',
      password_confirmation: 'pass1234',
    }
    const newUserData2: CreateUserDto = {
      email: TEST_EMAILS.UNIQUE,
      password: 'pass123432',
      password_confirmation: 'pass1234',
    }
    try {
      const newuser = await service.create(newUserData)
      expect(newuser).toThrowError()
    } catch (error) {
      expect(error.status).toBe(422)
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    try {
      const newuser = await service.create(newUserData2)
      expect(newuser).toThrowError()
    } catch (error) {
      expect(error.status).toBe(422)
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    expect(usersRepositoryMock.save).not.toHaveBeenCalled()
  })
  it('should UPDATE the user', async () => {
    const updateUserDto: UpdateUserDto = {
      email: 'updated' + TEST_EMAILS.UNIQUE,
    }
    const updatedUser = await service.update(1, updateUserDto)
    expect(updatedUser.email).toBe(updateUserDto.email)
    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1)
  })
  it('should NOT UPDATE the user', async () => {
    const updateUserDto: UpdateUserDto = {
      email: 'updated' + TEST_EMAILS.UNIQUE,
    }
    try {
      const updatedUser = await service.update(1, updateUserDto)
      const updatedUser2 = await service.update(2, updateUserDto)
      expect(updatedUser).toThrowError()
      expect(updatedUser2).toThrowError()
    } catch (error) {
      expect(error.status).toBe(422)
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    try {
      const updatedUser = await service.update(10, updateUserDto)
      expect(updatedUser).toThrowError()
    } catch (error) {
      expect(error.status).toBe(404)
      expect(error).toBeInstanceOf(NotFoundException)
    }
    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1)
  })

  it('should return TRUE', async () => {
    const uniqueEmail = await service.emailIsUnique(TEST_EMAILS.UNIQUE)
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: TEST_EMAILS.UNIQUE }, withDeleted: true })
    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1)
    expect(uniqueEmail).toBe(true)
  })
  it('should return FALSE', async () => {

    try {
      const uniqueEmail = await service.emailIsUnique(TEST_EMAILS.USER)
      expect(uniqueEmail).toThrowError()
    } catch (error) {
      expect(error.status).toBe(422)
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    expect(usersRepositoryMock.findOne).toHaveBeenCalled()
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: TEST_EMAILS.USER }, withDeleted: true })
  })
  it('should FIND ALL', async () => {
    const found: User[] = await service.findAll()
    expect(usersRepositoryMock.find).toHaveBeenCalledWith()
    expect(found.length).toBe(users.length)
  })
  it('should FIND by USERNAME', async () => {
    const found: User = await service.findOneByUsername(TEST_EMAILS.USER)
    expect(found.email).toBe(TEST_EMAILS.USER)
  })
});
