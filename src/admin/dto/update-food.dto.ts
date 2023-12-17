import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateFoodDto {
    @IsOptional()
    @IsString()
    name?: string
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    price?: number
}