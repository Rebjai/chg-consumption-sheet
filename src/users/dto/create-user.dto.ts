import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import UserRole from "../enums/user-role.enum";
export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @IsNotEmpty()
    password: string
    
    @ApiProperty()
    @IsNotEmpty()
    password_confirmation: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    role?: UserRole

}
