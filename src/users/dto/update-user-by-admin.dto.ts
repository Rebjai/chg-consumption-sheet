import { OmitType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserByAdminDto extends PartialType(OmitType(CreateUserDto, ['password', 'password_confirmation'] as const)) {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    staff_id?: number
}
