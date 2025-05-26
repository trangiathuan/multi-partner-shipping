// shipment/dto/create-shipment.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateShipmentDto {
    @IsNotEmpty()
    customerId: string;

    @IsNotEmpty()
    senderName: string;

    @IsNotEmpty()
    senderAddress: string;

    @IsNotEmpty()
    receiverName: string;

    @IsNotEmpty()
    receiverAddress: string;

    @IsNumber()
    weight: number;

    @IsNumber()
    length: number;

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;

    @IsNotEmpty()
    senderPhone: string;

    @IsNotEmpty()
    receiverPhone: string;

    @IsOptional()
    description?: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsUUID()
    partnerId?: string;


}
