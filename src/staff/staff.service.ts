import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Staff } from './entities/staff.entity';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) { }


  async create(createStaffDto: CreateStaffDto) {
    const errors = await validate(plainToInstance(CreateStaffDto, createStaffDto))
    if (errors.length > 1)
      throw new UnprocessableEntityException()

    const staff = new Staff()
    staff.name = createStaffDto.name
    staff.secondSurname = createStaffDto.second_surname
    staff.firstSurname = createStaffDto.first_surname
    staff.jobTitle = createStaffDto.job_title
    staff.dateOfBirth = createStaffDto.date_of_birth
    staff.telephoneNumber = createStaffDto.telephone_number
    // if (createStaffDto.user_id)
    // staff.user = 
    return await this.staffRepository.save(staff)
  }

  async findAll(): Promise<Staff[]> {
    return await this.staffRepository.find();
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffRepository.findOneBy({ id })
    if (!staff)
      throw new NotFoundException("Staff member not found");

    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepository.findOneBy({ id })
    if (!staff)
      throw new NotFoundException("Staff member not found");
    const errors = await validate(plainToInstance(UpdateStaffDto, updateStaffDto))
    if (errors.length > 1)
      throw new UnprocessableEntityException()
    staff.name = updateStaffDto.name
    staff.secondSurname = updateStaffDto.second_surname
    staff.firstSurname = updateStaffDto.first_surname
    staff.jobTitle = updateStaffDto.job_title
    staff.dateOfBirth = updateStaffDto.date_of_birth
    staff.telephoneNumber = updateStaffDto.telephone_number
    return await this.staffRepository.save(staff);
  }

  async remove(id: number) {
    return await this.staffRepository.softDelete({ id });
  }
}
