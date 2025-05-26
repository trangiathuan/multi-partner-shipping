import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CalculateFreightDto {
    @IsNotEmpty()
    sender_province: string;

    @IsNotEmpty()
    sender_address: string;

    @IsNotEmpty()
    sender_phone: string;

    @IsNotEmpty()
    sender_name: string;

    @IsNotEmpty()
    receiver_province: string;

    @IsNotEmpty()
    receiver_address: string;

    @IsNotEmpty()
    receiver_phone: string;

    @IsNotEmpty()
    receiver_name: string;

    @IsNotEmpty()
    weight: number;

    @IsOptional()
    length: number;

    @IsOptional()
    width: number;

    @IsOptional()
    height: number;

    @IsOptional()
    @IsUUID()
    partnerId?: string;
}