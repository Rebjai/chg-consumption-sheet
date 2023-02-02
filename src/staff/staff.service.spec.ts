import { UpdateStaffDto } from './dto/update-staff.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Staff } from './entities/staff.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';
import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';

describe('StaffService', () => {
  let service: StaffService;
  const staffList : Staff[]= [
    {
      id: 1,
      name: 'Enfermera',
      firstSurname: 'Appat',
      secondSurname: 'Apmat',
      dateOfBirth: new Date(1990, 1, 20),
      jobTitle: 'nurse',
      telephoneNumber: '9512223344',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
  const staffRepositoryMock = {
    save: jest.fn().mockImplementation((staff: Staff) => staff),
    findOneBy: jest.fn().mockImplementation(({ id }) => staffList.find(val => val.id == id) as Staff),
    find: jest.fn().mockImplementation((options) => staffList)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffService,
        {
          provide: getRepositoryToken(Staff),
          useValue: staffRepositoryMock
        }],
    }).compile();

    service = module.get<StaffService>(StaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE a staff entity', async () => {
    const newStaffData: CreateStaffDto = {
      name: 'Enfermera',
      first_surname: 'Appat',
      second_surname: 'Apmat',
      date_of_birth: new Date(1990, 1, 20),
      job_title: 'nurse',
      telephone_number: '9512223344'
    }
    const created = await service.create(newStaffData)
    expect(created).toBeInstanceOf(Staff)
    expect(staffRepositoryMock.save).toHaveBeenCalled()
  })
  it('should NOT CREATE a staff entity', async () => {
    const newStaffData: CreateStaffDto = {
      name: '',
      first_surname: 'Appat',
      second_surname: 'Apmat',
      date_of_birth: new Date(1990, 1, 20),
      job_title: 'nurse',
      telephone_number: '9512223344'
    }
    try {
      const created = await service.create(newStaffData)
      expect(created).toThrowError()

    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException)
      expect(error.status).toBe(422)
      expect(staffRepositoryMock.save).not.toHaveBeenCalledTimes(2)

    }
  })
  it('should UPDATE a staff entity', async () => {
    const newStaffData: UpdateStaffDto = {
      name: 'Enfermera',
      first_surname: 'Appat',
      second_surname: 'Apmat',
      date_of_birth: new Date(1990, 1, 20),
      job_title: 'nurse',
      telephone_number: '9512223355'
    }
    const found = await service.update(1, newStaffData)
    expect(staffRepositoryMock.findOneBy).toHaveBeenCalled()
    expect(staffRepositoryMock.save).toHaveBeenCalledTimes(2)
  })
  it('should NOT UPDATE a staff entity', async () => {
    const newStaffData: UpdateStaffDto = {
      name: '',
      first_surname: 'Appat',
      second_surname: 'Apmat',
      date_of_birth: new Date(1990, 1, 20),
      job_title: 'nurse',
      telephone_number: ''
    }
    try {
      const found = await service.update(1, newStaffData)
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException)
      expect(error.status).toBe(422)
    }
    finally {
      expect(staffRepositoryMock.save).not.toHaveBeenCalledTimes(3)
    }
    try {
      const found = await service.update(10, newStaffData)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
    finally {
      expect(staffRepositoryMock.save).not.toHaveBeenCalledTimes(3)
    }
  })

  it('should FIND ALL staff', async () => {
    const found = await service.findAll()
    expect(staffRepositoryMock.find).toHaveBeenCalledWith()
  })
  // it('should FIND ALL staff, pagination', async () => {
  //   const pagination = new PaginationDto()
  //   pagination.skip = 10
  //   const found = await service.findAll({}, pagination)
  //   expect(staffRepositoryMock.find).toHaveBeenCalledWith({ where: {}, skip: 10, take: 10 })
  // })
  it('should FIND ONE staff by id', async () => {
    const found = await service.findOne(1)
    expect(staffRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 })
  })
  it('should FAIL to FIND ONE staff by id', async () => {
    try {
      const found = await service.findOne(10)
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
  })
  
});
