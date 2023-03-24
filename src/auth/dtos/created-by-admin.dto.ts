import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
}