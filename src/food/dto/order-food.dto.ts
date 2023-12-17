import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested, } from "class-validator"

class Order {
    @IsNotEmpty()
    @IsNumber()
    foodId: number;
    @IsNotEmpty()
    @IsNumber()
    qty: number;
}

export class OrderFoodDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => Order)
    order: Order[]
}