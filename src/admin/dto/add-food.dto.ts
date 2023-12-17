import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddFoodDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    price: number;
}