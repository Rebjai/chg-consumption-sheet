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
    staff.second_surname = createStaffDto.second_surname
    staff.first_surname = createStaffDto.first_surname
    staff.job_title = createStaffDto.job_title
    staff.date_of_birth = createStaffDto.date_of_birth
    staff.telephone_number = createStaffDto.telephone_number
    if (createStaffDto.user_id) {

      staff.user_id = createStaffDto.user_id
      console.log({userid: staff.user_id});
    }
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

  async getProfile(userId: number) {
    const staff = await this.staffRepository.findOneBy({user_id: userId})
    return staff
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    console.log({ id, updateStaffDto });

    const staff = await this.staffRepository.findOneBy({ id: id?id:0 })
    console.log({staff});
    
    if (!staff && updateStaffDto.user_id) {
      console.log('newprofile');
      let newProfile = new CreateStaffDto()
      newProfile.name = updateStaffDto.name
      newProfile.second_surname = updateStaffDto.second_surname
      newProfile.first_surname = updateStaffDto.first_surname
      newProfile.job_title = updateStaffDto.job_title
      newProfile.date_of_birth = updateStaffDto.date_of_birth
      newProfile.telephone_number = updateStaffDto.telephone_number
      newProfile.user_id = updateStaffDto.user_id
      console.log({newProfile});
      
      return this.create(newProfile)
    }
    if (!staff)
      throw new NotFoundException("Staff member not found");
    const errors = await validate(plainToInstance(UpdateStaffDto, updateStaffDto))
    if (errors.length > 1)
      throw new UnprocessableEntityException()
    staff.name = updateStaffDto.name
    staff.second_surname = updateStaffDto.second_surname
    staff.first_surname = updateStaffDto.first_surname
    staff.job_title = updateStaffDto.job_title
    staff.date_of_birth = updateStaffDto.date_of_birth
    staff.telephone_number = updateStaffDto.telephone_number
    return await this.staffRepository.save(staff);
  }

  async remove(id: number) {
    return await this.staffRepository.softDelete({ id });
  }
}
