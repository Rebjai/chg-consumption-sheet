import { UpdateUserDto } from './dto/update-user.dto';
import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Unique } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  const TEST_EMAILS = {
    UNIQUE: 'unique@email.com',
    ADMIN: 'admin@mail.com',
    USER: 'mail@mail.com'
  }
  const users: User[] = [{
    id: 1,
    email: 'admin@mail.com',
    password: 'pass',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    email: 'mail@mail.com',
    password: 'pass',
    role: '2',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  ]
  const usersRepositoryMock = {
    save: jest.fn((x) => x),
    findOneBy: jest.fn().mockImplementation(({ email, id }) => email ? users.find(e => e.email == email) : id ? users.find(e => e.id == id) : null),
    find: jest.fn((...args)=> users)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock
        }
      ],
    }).compile();

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
      const updatedUser2 = await service.update(10, updateUserDto)
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
    expect(usersRepositoryMock.save).toHaveBeenCalledTimes(0)
  })

  it('should return TRUE', async () => {
    const uniqueEmail = await service.emailIsUnique(TEST_EMAILS.UNIQUE)
    expect(usersRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: TEST_EMAILS.UNIQUE })
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
    expect(usersRepositoryMock.findOneBy).toHaveBeenCalled()
    expect(usersRepositoryMock.findOneBy).toHaveBeenCalledWith({ email: TEST_EMAILS.USER })
  })
  it('should FIND ALL', async () => {
    const found: User[] = await service.findAll()
    expect(usersRepositoryMock.find).toHaveBeenCalledWith()
    expect(found.length).toBe(users.length)
  })
});
