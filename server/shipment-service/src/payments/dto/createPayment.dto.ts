import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePaymentDTO {
    @IsString()
    @IsNotEmpty()
    method: string

    @IsNotEmpty()
    @IsNumber()
    amount: string
}