import { PatientQueryDto } from './dto/patient-query.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>
  ) { }

  async create(createPatientDto: CreatePatientDto) {
    const errors = await validate(plainToInstance(CreatePatientDto, createPatientDto))
    if (errors.length > 0)
      throw new BadRequestException({ errors })

    const patient = new Patient()
    patient.name = createPatientDto.name;
    patient.first_surname = createPatientDto.first_surname;
    patient.second_surname = createPatientDto.second_surname;
    patient.date_of_birth = createPatientDto.date_of_birth;

    return await this.patientsRepository.save(patient);
  }

  async findAll(query?: PatientQueryDto): Promise<Patient[]> {
    if (!query?.with_cosumption) {
      return await this.patientsRepository.createQueryBuilder('patient')
        .leftJoinAndSelect('patient.consumption_sheet', 'consumption_sheet')
        .where('consumption_sheet.id IS NULL')
        .getMany();

    }

    return await this.patientsRepository.find(
      {
        where: {
          active: true
        }
      });
  }

  async findOne(id: number): Promise<Patient> {
    const patient: Patient = await this.patientsRepository.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException()
    }
    return patient
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientsRepository.findOneBy({ id });
    const errors = await validate(plainToInstance(UpdatePatientDto, updatePatientDto))
    if (!patient) {
      throw new NotFoundException()
    }
    if (errors.length > 0) {
      throw new BadRequestException({ errors })
    }
    patient.name = updatePatientDto.name;
    patient.first_surname = updatePatientDto.first_surname;
    patient.second_surname = updatePatientDto.second_surname;
    patient.date_of_birth = updatePatientDto.date_of_birth;
    patient.active = updatePatientDto.active;
    return await this.patientsRepository.save(patient);
  }

  async remove(id: number) {
    // const patient = await this.patientsRepository.findOneBy({id})
    // return await this.patientsRepository.softRemove(patient);
    return await this.patientsRepository.softRemove({ id });
  }
}
