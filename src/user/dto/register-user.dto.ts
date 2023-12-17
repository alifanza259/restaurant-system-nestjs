import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;
}