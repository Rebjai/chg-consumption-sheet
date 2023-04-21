import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import UserRole from 'src/users/enums/user-role.enum';

export class CreatedByAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: UserRole;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  staff_id?: number

}