import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsBooleanString } from 'class-validator';

export class StaffQueryDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
    
    @ApiProperty()
    @IsBooleanString()
    @IsOptional()
    unassigned?: boolean;
}

