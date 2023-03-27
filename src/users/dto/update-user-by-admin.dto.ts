import { OmitType } from '@nestjs/mapped-types';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserByAdminDto extends PartialType(OmitType(CreateUserDto, ['password', 'password_confirmation'] as const)) {
}
