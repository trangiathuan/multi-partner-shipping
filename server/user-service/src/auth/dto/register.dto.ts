// src/auth/dto/register.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    full_name: string;

    @IsOptional()
    @IsString()
    phone?: string;
}
