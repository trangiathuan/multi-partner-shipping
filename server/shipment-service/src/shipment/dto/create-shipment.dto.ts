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

    @IsNotEmpty()
    dimension: string;

    @IsOptional()
    @IsUUID()
    partnerId?: string;
}
