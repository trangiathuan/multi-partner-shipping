import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDTO {
    @IsString()
    @IsNotEmpty()
    orderId: string

    @IsString()
    @IsNotEmpty()
    method: string

    @IsNotEmpty()
    @IsNumber()
    amount: number
}