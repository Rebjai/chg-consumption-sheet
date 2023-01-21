import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateConsumptionDetailDto {

    @IsNotEmpty()
    @IsNumber()
    consumption_sheet_id: number;

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsNumber()
    staff_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    total: number;
    
}
