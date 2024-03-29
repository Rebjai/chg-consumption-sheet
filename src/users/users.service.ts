import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import ChgHashService from '../auth/Interfaces/chg-hash-service.Interface'
import BcryptHashService from '../auth/bcrypt-hash.service';
import UserRole from 'src/users/enums/user-role.enum';
import { StaffService } from './../staff/staff.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(StaffService) private staffService: StaffService,
    @Inject(BcryptHashService) private hashService: ChgHashService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.emailIsUnique(createUserDto.email)
    const errors = await validate(plainToInstance(CreateUserDto, createUserDto))
    if (errors.length > 0)
      throw new UnprocessableEntityException({ errors, status: 422 });
    const passwordMatch = createUserDto.password == createUserDto.password_confirmation
    if (!passwordMatch) {
      throw new UnprocessableEntityException('passwords don\'t match');
    }
    const users = await this.usersRepository.count() > 0
    console.log({ users })
    const user = new User()
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.role = !users ? 10 : createUserDto.role ?? 1

    return this.usersRepository.save(user);
  }
  async emailIsUnique(email: string): Promise<Boolean> {
    const userExists = await this.usersRepository.findOne({where: {email}, withDeleted: true})
    if (userExists)
      throw new UnprocessableEntityException(['Email already in use']);
    return !userExists
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['profile'],
      where: { id }
    })
    if (!user)
      throw new NotFoundException();
    return user
  }
  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: username })
    if (!user)
      throw new NotFoundException();
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    if (user.email !== updateUserDto.email) {
      const emailIsUnique = await this.emailIsUnique(updateUserDto.email)
      user.email = updateUserDto.email
    }
    this.usersRepository.save(user)
    return user;
  }
  async updateAccount(id: number, updateUserDto: UpdateUserAccountDto): Promise<User> {
    const user = await this.findOne(id)
    const errors = await validate(plainToInstance(UpdateUserAccountDto, updateUserDto))
    if (errors.length > 0)
      throw new UnprocessableEntityException(errors.map(errorValue => Object.values(errorValue.constraints))[0]);

    if (!await this.hashService.compare(updateUserDto.current_password, user.password)) {
      throw new UnprocessableEntityException(["Wrong Password"]);
    }
    if (user.email !== updateUserDto.email) {
      const emailIsUnique = await this.emailIsUnique(updateUserDto.email)
      user.email = updateUserDto.email
    }

    if (!!updateUserDto.password && updateUserDto.password != '') {
      const passwordMatch = updateUserDto.password == updateUserDto.password_confirmation
      if (!passwordMatch) {
        throw new UnprocessableEntityException(['passwords don\'t match']);
      }
      user.password = await this.hashService.hash(updateUserDto.password)
    }
    this.usersRepository.save(user)
    return user;
  }

  async updateByAdmin(id: number, updateUserDto: UpdateUserByAdminDto) {
    const user = await this.findOne(id)
    console.log({ updateUserDto });
    if (updateUserDto.staff_id) {

      const staffUpdated = this.staffService.setUser(updateUserDto.staff_id, user.id)
      console.log({ staffUpdated });
    }
    if (user.email !== updateUserDto.email) {
      const emailIsUnique = await this.emailIsUnique(updateUserDto.email)
      user.email = updateUserDto.email
    }
    user.role = updateUserDto.role


    await this.usersRepository.save(user)
    return user;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const user = await this.findOne(userId)
    user.rt = rt
    this.usersRepository.save(user)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    user.email +='-d:'+Date.now().toString()
    await this.usersRepository.save(user)
    if (user.role == UserRole.USER) {
      if (user.profile) {
        this.staffService.remove(user.profile.id)
      }
    }
    return this.usersRepository.softDelete({ id });
  }
}
