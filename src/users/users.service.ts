import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';

@Injectable()
export class UsersService {
  
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }
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
    console.log({users})
    const user = new User()
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.role = !users? 10: createUserDto.role ?? 1
    
    return this.usersRepository.save(user);
  }
  async emailIsUnique(email: string): Promise<Boolean> {
    const userExists = await this.usersRepository.findOneBy({ email })
    if (userExists)
      throw new UnprocessableEntityException();
    return !userExists
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = this.usersRepository.findOneBy({ id })
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

  async updateByAdmin(id: number, updateUserDto: UpdateUserByAdminDto) {
    const user = await this.findOne(id)
    if (user.email !== updateUserDto.email) {
      const emailIsUnique = await this.emailIsUnique(updateUserDto.email)
      user.email = updateUserDto.email
    }
    user.role = updateUserDto.role
    

    this.usersRepository.save(user)
    return user;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const user = await this.findOne(userId)
    user.rt = rt
    this.usersRepository.save(user)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
