import { Staff } from './entities/staff.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from './staff.service';

describe('StaffService', () => {
  let service: StaffService;
  const staffRepositoryMock = {
    find: jest.fn().mockImplementation(() => { })
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
});
