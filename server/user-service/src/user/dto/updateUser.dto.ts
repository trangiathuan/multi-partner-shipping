import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateUserDto {
    @IsNotEmpty()
    id: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    fullName: string;

    @IsString()
    phone: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;
}