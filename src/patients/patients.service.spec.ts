import { UpdatePatientDto } from './dto/update-patient.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';

import { paginate } from 'nestjs-typeorm-paginate';
jest.mock('nestjs-typeorm-paginate');

describe('PatientsService', () => {
  let service: PatientsService;
  const patients: Patient[] = [
    {
      id: 1,
      name: 'Jane',
      first_surname: 'Doe',
      second_surname: 'Deo',
      active: true,
      date_of_birth: new Date(1990, 12, 13),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 1,
      name: 'John',
      first_surname: 'Doe',
      second_surname: 'Deo',
      active: true,
      date_of_birth: new Date(1990, 12, 13),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]
  const patientsRepositoryMock = {
    save: jest.fn().mockImplementation((x: Patient) => x),
    findOneBy: jest.fn().mockImplementation(({ id }) => patients.find(val => val.id == id) as Patient),
    find: jest.fn().mockImplementation((options) => patients),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(patients),
      getCount: jest.fn().mockResolvedValue(patients.length),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
    }),
  }
  const paginatedResult = {
    items: [],
    meta: {
      itemCount: 0,
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService,
        { provide: getRepositoryToken(Patient), useValue: patientsRepositoryMock }],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    (paginate as jest.Mock).mockResolvedValue(paginatedResult);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE new patient', async () => {
    const newPatient: CreatePatientDto = {
      name: 'Jane',
      first_surname: 'Doe',
      second_surname: 'Deo',
      date_of_birth: new Date(1990, 12, 12),
    }
    const patient = await service.create(newPatient)
    expect(patientsRepositoryMock.save).toHaveBeenCalled()
    expect(patient).toBeInstanceOf(Patient)
  })

  it('should NOT CREATE a patient', async () => {
    let isError = false
    try {
      const newPatient: CreatePatientDto = {
        name: '',
        first_surname: '',
        second_surname: '',
        date_of_birth: new Date(1990, 12, 12)
      }
      const created = await service.create(newPatient)
    } catch (error) {
      isError = true
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    try {
      const newPatient: CreatePatientDto = {
        name: 'CS 500',
        first_surname: '',
        second_surname: '',
        date_of_birth: new Date(1990, 12, 12)
      }
      const created = await service.create(newPatient)
    } catch (error) {
      isError = true
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    expect(isError).toBe(true)
    expect(patientsRepositoryMock.save).not.toHaveBeenCalledTimes(2)
  })

  it('should UPDATE patient', async () => {
    const updatedpatient: UpdatePatientDto = {
      name: 'janet',
      first_surname: 'Doe',
      second_surname: 'Deo',
      date_of_birth: new Date(1996, 8, 24),
      active: false,
    }
    const updated = await service.update(1, updatedpatient)
    expect(patientsRepositoryMock.findOneBy).toHaveBeenCalledTimes(1)
    expect(patientsRepositoryMock.save).toHaveBeenCalledTimes(2)
  })

  it('should NOT UPDATE patient', async () => {
    try {
      const updatedpatient: UpdatePatientDto = { name: '', first_surname: '', second_surname: '', active: false }
      const updated = await service.update(1, updatedpatient)
    } catch (error) {
      expect(patientsRepositoryMock.findOneBy).toHaveBeenCalledTimes(2)
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    try {
      const updatedpatient: UpdatePatientDto = { name: 'CS 500', first_surname: '', second_surname: '', active: true }
      const updated = await service.update(10, updatedpatient)
    } catch (error) {
      expect(patientsRepositoryMock.findOneBy).toHaveBeenCalledTimes(3)
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
    expect(patientsRepositoryMock.save).not.toHaveBeenCalledTimes(3)
  })

  it('should FIND ALL patients', async () => {
    const found = await service.findAll()
    expect(patientsRepositoryMock.createQueryBuilder).toHaveBeenCalled()
  })

  it('should FIND ONE patient', async () => {
    const found = await service.findOne(1)
    expect(patientsRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 })
  })

  it('should NOT FIND ONE patient', async () => {
    let isError = false
    try {
      const found = await service.findOne(10)
    } catch (error) {
      isError = true
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
    expect(patientsRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 10 })
    expect(isError).toBe(true)
  })
});
