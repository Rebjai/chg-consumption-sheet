import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserAccountDto extends PartialType(CreateUserDto) {

    @IsNotEmpty()
    @IsString()
    current_password?: string

    @IsOptional()
    @IsString()
    password?: string
}
