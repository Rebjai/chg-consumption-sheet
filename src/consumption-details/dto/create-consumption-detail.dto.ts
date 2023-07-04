import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateConsumptionDetailDto {

    @IsNotEmpty()
    @IsNumber()
    consumption_sheet_id: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsOptional()
    @IsNumber()
    staff_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsOptional()
    @IsNumber()
    area_id: number;

}
